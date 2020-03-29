import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../entities/register';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  hide = true;
  user = new RegisterModel();
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
    this.route.navigate(['/login']);
  }

  initialiseControls() {
    this.emailControl = new FormControl("", [
      Validators.required,
      Validators.email
    ]);
    this.emailControl.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.nameControl = new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.nameControl.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.passwordControl = new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]);
    this.passwordControl.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.jobStatusControl = new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.jobStatusControl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

}
