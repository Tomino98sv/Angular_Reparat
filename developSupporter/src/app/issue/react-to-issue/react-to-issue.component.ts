import { Component, OnInit } from '@angular/core';
import { Issue } from './../../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentObject } from 'src/app/entities/comment';
import { error } from 'protractor';

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
    this.service.pushComment(this.openIssue.idDoc,this.fireUser.uid, comment).then(resolte => {
      alert("Comment successfully sended");
    });
  }

  getReactions(idIssue: string) {

    this.service.listenToCommentChanges(idIssue).onSnapshot(onSnapshot => {
      onSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log("Added issue: ", change.doc.id, change.doc.data());
          this.getAuthorInfoAndPUSH(change.doc.data(), change.doc.id);
        }
        if (change.type === "modified") {
            console.log("Modified issue: ", change.doc.id, change.doc.data());
            this.comments.forEach((item, index) => {
              if(change.doc.id === item.idComment) {
                var fireUser: firebase.User = JSON.parse(localStorage.getItem("user"));
                var myComment = change.doc.data().uid === fireUser.uid ? true : false;
                let commentModify = new CommentObject();
                commentModify.content = change.doc.data().content;
                this.service.getUserById(change.doc.data().uid).then(docU => {
                  commentModify.idComment = change.doc.id;
                  commentModify.authorName = docU.data().name;
                  commentModify.title = docU.data().jobstatus;
                  commentModify.logUserCom = myComment;
                }).finally(() => {
                  this.loadingComments = false; 
                  this.comments[index] = commentModify;
                });
              }
            });
        }
        if (change.type === "removed") {
            console.log("Removed issue: ", change.doc.id, change.doc.data());
            this.comments.forEach((item, index) => {
              if(change.doc.id === item.idComment) {
                this.comments.splice(index, 1);
              }
            });
        }
    },this.loadingComments = false);
    }, error => {
      alert(error)
      this.loadingComments = false;
    });
  }

  getAuthorInfoAndPUSH(data, idComment) {
    var fireUser: firebase.User = JSON.parse(localStorage.getItem("user"));
    var myComment = data.uid === fireUser.uid ? true : false;
    let comment = new CommentObject();
    comment.content = data.content;
    this.service.getUserById(data.uid).then(doc => {
      comment.idComment = idComment;
      comment.authorName = doc.data().name;
      comment.title = doc.data().jobstatus;
      comment.logUserCom = myComment;
      this.comments.push(comment);
    }).finally(() => {this.loadingComments = false; });
  }

  visitUserAccount() {
    this.route.navigate(['/home', 'visitUser'], {queryParams: {
      id: this.openIssue.uidAuthor
    }});
  }

}
