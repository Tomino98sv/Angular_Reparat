import { Component, OnInit } from '@angular/core';
import { Issue } from './../../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommentObject } from 'src/app/entities/comment';

@Component({
  selector: 'app-react-to-issue',
  templateUrl: './react-to-issue.component.html',
  styleUrls: ['./react-to-issue.component.css']
})
export class ReactToIssueComponent implements OnInit {
  openIssue: Issue = new Issue();
  comments = new Array<CommentObject>();
  fireUser: firebase.User;
  loading = true;
  addComment = false;

  constructor(
    public service: FirebaseServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.openIssue.idDoc = this.route.snapshot.queryParams['id'];
    this.getReactions(this.openIssue.idDoc);
    this.service.getIssueById(this.openIssue.idDoc)
    .then(doc => {
      if(doc.exists) {
        let data = doc.data();

              this.openIssue.title = data.title;
              this.openIssue.content = data.content;
              this.openIssue.uidAuthor = data.uidAuthor;
              this.openIssue.userName = data.userName;
              this.openIssue.reactions = data.reactions;
      } else {
        console.log("Document with ID: "+this.openIssue.idDoc+" doesn't exists or is unreachable");
      }
      this.loading = false;

    }).catch(error => {
      console.log(error);
      this.loading = false;

    });
  }

  saveComment(comment: string) {
    this.fireUser = this.service.getUserData();
    this.service.pushComment(this.fireUser.uid, comment).then(resolte => {
      this.service.updateIssueReactions(resolte.id, this.openIssue.idDoc).then(result => {
          alert("Comment successfully sended")
      });
    });
  }

  getReactions(idIssue: string): Array<CommentObject> {
    this.service.getIssueById(idIssue).then(doc => {
      if (doc.data().reactions.length !== 0) {

        doc.data().reactions.forEach(element => {
          this.service.getComment(element).then(doc => {
            this.getAuthorInfoAndPUSH(doc.data());
          });
        });
      }
    });
    return new Array<CommentObject>();
  }

  getAuthorInfoAndPUSH(data) {
    let comment = new CommentObject();
    comment.content = data.content;
    this.service.getUserById(data.uid).then(doc => {
      comment.authorName = doc.data().name;
      this.comments.push(comment);
      console.log(comment);
      
    });
  }

}
