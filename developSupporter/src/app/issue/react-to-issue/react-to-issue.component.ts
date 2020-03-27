import { Component, OnInit } from '@angular/core';
import { Issue } from './../../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentObject } from 'src/app/entities/comment';

@Component({
  selector: 'app-react-to-issue',
  templateUrl: './react-to-issue.component.html',
  styleUrls: ['./react-to-issue.component.css']
})
export class ReactToIssueComponent implements OnInit {
  openIssue: Issue = new Issue(
    "",
    "",
    {  name: "",jobStatus: "" },
    "",
    ""
  );
  comments = new Array<CommentObject>();
  fireUser: firebase.User;
  loading = true;
  loadingComments = true;
  addComment = false;

  constructor(
    public service: FirebaseServiceService,
    private ActivRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.openIssue.idDoc = this.ActivRoute.snapshot.queryParams['id'];
    this.getReactions(this.openIssue.idDoc);
    this.service.getIssueById(this.openIssue.idDoc)
    .then(doc => {
      if(doc.exists) {
        let data = doc.data();
        this.service.getUserById(data.uidAuthor).then(docUser => {
          this.openIssue.title = data.title;
          this.openIssue.content = data.content;
          this.openIssue.uidAuthor = data.uidAuthor;
          this.openIssue.reactions = data.reactions;
          let dataUser = docUser.data();
          this.openIssue.authorData.name = dataUser.name;
          this.openIssue.authorData.jobStatus = dataUser.jobstatus;
        }).finally(() => {this.loading = false; });
      } else {
        console.log("Document with ID: "+this.openIssue.idDoc+" doesn't exists or is unreachable");
        this.loading = false;
      }
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
      }else {
        this.loadingComments = false;
      }
    });
    return new Array<CommentObject>();
  }

  getAuthorInfoAndPUSH(data) {
    let comment = new CommentObject();
    comment.content = data.content;
    this.service.getUserById(data.uid).then(doc => {
      comment.authorName = doc.data().name;
      comment.title = doc.data().jobstatus;
      this.comments.push(comment);
      console.log(comment);
    }).finally(()=>{this.loadingComments = false;});
  }

  visitUserAccount() {
    this.route.navigate(['/home', 'visitUser'], {queryParams: {
      id: this.openIssue.uidAuthor
    }});
  }

}
