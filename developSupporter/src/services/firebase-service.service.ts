import { Injectable } from '@angular/core';
import { RegisterModel } from './../app/models/register.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  private authError = new BehaviorSubject<string>("");
  eventAuthError = this.authError.asObservable();
  private authComplete = new BehaviorSubject<boolean>(false);
  eventAuthCompletetion = this.authComplete.asObservable();
  currentError;

  newUser: RegisterModel;

  constructor(
    private firAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  createUser(user: RegisterModel) {
    this.firAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    ).then( userCredentials => {
      this.newUser = user;
      console.log(userCredentials);
      userCredentials.user.updateProfile({
        displayName: user.name
      });
      this.insertUserData(userCredentials)
      .then(() => {
        this.authComplete.next(true);
        
        this.router.navigate(['/login']);
      });
    }).catch(error => {
      this.authError.next(error);
    });
  }

  insertUserData(userCredentials: firebase.auth.UserCredential) {
    return this.db.doc('Users/'+userCredentials.user.uid).set({
      email: this.newUser.email,
      name: this.newUser.name
    });
  }

  login(email:string, password: string) {
    this.currentError = null;
    this.firAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        this.authError.next(error);
        this.currentError = error;
    })
    .then((userCredential: firebase.auth.UserCredential) => {
      if(this.currentError){

      }else {

        console.log("continue");
      
        console.log(userCredential);
        this.router.navigate(['/account']);
  
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("email", userCredential.user.email);
        localStorage.setItem("username", userCredential.additionalUserInfo.username);
        localStorage.setItem("password", password);
      }
    });
  }
}
