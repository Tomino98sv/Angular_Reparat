import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../entities/register';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  errorMess = "";
  hide = true;
  user = new RegisterModel();
  changedUser = new RegisterModel();

  userCredentials: firebase.auth.UserCredential;
  loading = true;
  updating = false;

  emailControl: FormControl;
  nameControl: FormControl;
  passwordControl: FormControl;
  jobStatusControl: FormControl;

  constructor(
    private serviceAuth: FirebaseServiceService,
    private route: Router) { }

  ngOnInit(): void {
    this.userCredentials = this.serviceAuth.getUserCredencial();
    this.serviceAuth.getUserDataFromDB()
    .then(doc => {
      this.user = (<RegisterModel>{...doc.data()});
      this.user.password = localStorage.getItem("password");
    }).finally(() => {this.loading = false });

    this.initialiseControls();
  }

  logOut() {
    this.serviceAuth.logout();
  }

  initialiseControls() {
    this.emailControl = new FormControl("", [
      Validators.required,
      Validators.email
    ]);
    this.emailControl.valueChanges.subscribe(value => {
      this.changedUser.email = value;
    });

    this.nameControl = new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.nameControl.valueChanges.subscribe(value => {
      this.changedUser.name = value;    });

    this.passwordControl = new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]);
    this.passwordControl.valueChanges.subscribe(value => {
      this.changedUser.password = value;    });

    this.jobStatusControl = new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.jobStatusControl.valueChanges.subscribe(value => {
      this.changedUser.jobstatus = value;    });
  }

  saveChanges() {
    this.serviceAuth.updateUser(this.changedUser)
    .subscribe((result:Array<any>) => {

      this.serviceAuth.getUserDataFromDB()
      .then(doc => {
        this.user = (<RegisterModel>{...doc.data()});
        this.user.password = localStorage.getItem("password");
      }).finally(() => {
        this.emailControl.reset();
        this.passwordControl.reset();
        this.nameControl.reset();
        this.jobStatusControl.reset();
        this.updating = false;
        this.serviceAuth.logout();
      });

    },error => {
      console.log(error);
      this.errorMess = error.message;
    });
  }

  cancelChanges() {
    this.emailControl.reset();
    this.passwordControl.reset();
    this.nameControl.reset();
    this.jobStatusControl.reset();
    this.updating = false;

  }

}
