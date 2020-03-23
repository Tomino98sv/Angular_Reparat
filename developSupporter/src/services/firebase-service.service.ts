import { Injectable, OnInit } from '@angular/core';
import { RegisterModel } from '../app/entities/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Issue } from './../app/entities/issue';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  private authError = new BehaviorSubject<string>("");
  eventAuthError = this.authError.asObservable();
  private authComplete = new BehaviorSubject<boolean>(false);
  eventAuthCompletetion = this.authComplete.asObservable();

  newUser: RegisterModel;
  fireUser: firebase.User;


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
    this.firAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        this.authError.next(error);
    })
    .then((userCredential: firebase.auth.UserCredential) => {
      if(userCredential){
        this.authComplete.next(true);
        this.fireUser = userCredential.user;
        localStorage.setItem("user", JSON.stringify(this.fireUser));
        
        localStorage.setItem("password", password);
        this.router.navigate(['/account']);
      }
    });
  }

  getUserData(): firebase.User {
    return this.fireUser;
  }

  isLogged() {
    this.fireUser = JSON.parse(localStorage.getItem("user"));
   if(this.fireUser){
     return true;
   }else {
     return false;
   }
  }

  logout() {
    this.firAuth.auth.signOut();
    localStorage.setItem("user", null);
    localStorage.setItem("password","");
    this.fireUser = null;
  }

  insertPost(data: Issue) {
    return this.db
    .collection("Issues")
    .add({...data});
  }

  fetchData() {
    return this.db
    .collection("Issues")
    .get();
  }

}
