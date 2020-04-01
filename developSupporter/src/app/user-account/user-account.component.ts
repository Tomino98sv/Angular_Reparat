import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../entities/register';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { CanComponentDeactivate } from 'src/guards/confirmation.guard';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit,CanComponentDeactivate {
  errorMess = null;
  completeSucc = "";
  newKnow = "";
  hide = true;
  user = new RegisterModel();
  originalUser = new RegisterModel();
  changedUser = new RegisterModel();

  userCredentials: firebase.auth.UserCredential;
  loading = true;
  updating = false;
  addingKnowledge = false;

  emailControl: FormControl;
  nameControl: FormControl;
  passwordControl: FormControl;
  jobStatusControl: FormControl;

  addKnowledgeControl: FormControl;

  constructor(
    private serviceAuth: FirebaseServiceService,
    private route: Router) { }


    canLeave(): boolean | Observable<boolean> | Promise<boolean> {

      const canLeave = this.areThereEquals(this.originalUser.knowledges, this.user.knowledges);  //just test
      if (canLeave) return true;

      const confirmation = window.confirm("You are not saved your change in knowledges");
      return of(confirmation);
    }

  ngOnInit(): void {
    this.userCredentials = this.serviceAuth.getUserCredencial();
    this.serviceAuth.getUserDataFromDB()
    .then(doc => {
      this.user = (<RegisterModel>{...doc.data()});
      this.user.password = localStorage.getItem("password");
      this.originalUser = (<RegisterModel>{...doc.data()});
      this.originalUser.password = localStorage.getItem("password");
    }).finally(() => {
      this.loading = false 
    });

    this.initialiseControls();
  }

  logOut() {
    this.serviceAuth.logout();
  }

  initialiseControls() {
    this.emailControl = new FormControl("", [
      Validators.email
    ]);
    this.emailControl.valueChanges.subscribe(value => {
      this.changedUser.email = value;
    });

    this.nameControl = new FormControl("", [
      Validators.minLength(2)
    ]);
    this.nameControl.valueChanges.subscribe(value => {
      this.changedUser.name = value;    });

    this.passwordControl = new FormControl("", [
      Validators.minLength(6),
      Validators.maxLength(15)
    ]);
    this.passwordControl.valueChanges.subscribe(value => {
      this.changedUser.password = value;    });

    this.jobStatusControl = new FormControl("", [
      Validators.minLength(2)
    ]);
    this.jobStatusControl.valueChanges.subscribe(value => {
      this.changedUser.jobstatus = value;    });

    this.addKnowledgeControl = new FormControl("", [
      Validators.minLength(2)
    ]);
    this.addKnowledgeControl.valueChanges.subscribe(value => {
        if(value){
          this.newKnow = value;
        }
    });
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

  addKnow() {
    this.user.knowledges.push(this.newKnow);
    this.newKnow = "";
    this.addKnowledgeControl.reset();
  }

  removeKnow(index: number) {
    this.user.knowledges.splice(index, 1);
  }

  saveKnowledges() {
    this.serviceAuth.updateKnowledges(this.user.knowledges)
    .catch(error => {
      this.errorMess = error.message;
    })
    .then(response => {
      this.completeSucc = "Success"
    });
  }

  areThereEquals(original: Array<string>, current: Array<string>): boolean {
    let result = true;
    if (original.length === current.length) {
      original.forEach(value => {
        if (!current.includes(value)){
          result = false;
        }
      });
    } else {
      result = false;
    }
    return result;

  }

}
