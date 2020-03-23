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
  newIssue = new Issue();
  issueForm: FormGroup;
  currentUser: firebase.User;

  constructor(
    private firebaseServ: FirebaseServiceService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.firebaseServ.getUserData();
    this.newIssue.uidAuthor = this.currentUser.uid;
    this.newIssue.userName = this.currentUser.displayName;

    

    this.issueForm = new FormGroup({
      'title': new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  onNewIssueSubmit() {

  }
}
