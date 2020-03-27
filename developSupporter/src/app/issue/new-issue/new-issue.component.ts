import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Issue } from './../../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  newIssue =    new Issue(
    "",
    "",
    {  name: "",jobStatus: "" },
    "",
    ""
  );
  issueForm: FormGroup;
  currentUser: firebase.User;
  loading = false;
  error = null;
  response = null;

  constructor(
    private firebaseServ: FirebaseServiceService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.firebaseServ.getUserData();
    this.newIssue.uidAuthor = this.currentUser.uid;

    this.issueForm = new FormGroup({
      'title': new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      'content': new FormControl("",[
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onNewIssueSubmit() {
    this.loading = true;
    this.error = null;
    this.response = null;

    this.newIssue.title = this.issueForm.get("title").value;
    this.newIssue.content = this.issueForm.get("content").value;
    this.firebaseServ.insertPost(this.newIssue)
    .then(response => {
      console.log(response);
      this.loading = false;
      this.response = response;
      this.issueForm.reset();
      this.issueForm.get("title").setErrors(null);
      this.issueForm.get("content").setErrors(null);

    }, error => {
      this.loading = false;
      this.error = error;
    });
  }

  clearAlert() {
    this.error = null;
    this.response = null;
  }

}
