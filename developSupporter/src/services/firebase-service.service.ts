import { Injectable, OnInit } from '@angular/core';
import { RegisterModel } from '../app/entities/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, combineLatest, forkJoin } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Issue } from './../app/entities/issue';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  private authError = new BehaviorSubject<string>("");
  eventAuthError = this.authError.asObservable();
  private authComplete = new BehaviorSubject<boolean>(false);
  eventAuthCompletetion = this.authComplete.asObservable();

  newUser: RegisterModel;
  currentIsue: Issue;

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
    console.log(this.newUser);
    
    return this.db.doc('Users/'+userCredentials.user.uid).set({
      email: this.newUser.email,
      name: this.newUser.name,
      jobstatus: this.newUser.jobstatus,
      knowledges: JSON.parse(JSON.stringify(this.newUser.knowledges)),
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
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        localStorage.setItem("userCredential", JSON.stringify(userCredential));
        localStorage.setItem("password", password);
        this.router.navigate(['/account']);
      }
    });
  }

  getUserCredencial(): firebase.auth.UserCredential{
     return <firebase.auth.UserCredential> JSON.parse(localStorage.getItem("userCredential"));
  }

  getUserData(): firebase.User {
    var fireUser: firebase.User = JSON.parse(localStorage.getItem("user"));
    return fireUser;
  }

  getUserDataFromDB(): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    var fireUser: firebase.User = JSON.parse(localStorage.getItem("user"));
    return this.db.collection("Users")
    .doc(fireUser.uid)
    .ref
    .get();
  }

  isLogged() {
    var fireUser: firebase.User = JSON.parse(localStorage.getItem("user"));
   if(fireUser){
     return true;
   }else {
     return false;
   }
  }

  logout() {
    this.firAuth.auth.signOut();
    localStorage.setItem("user", null);
    localStorage.setItem("password","");
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

  getIssueById(id: string) {
    return this.db.collection("Issues").doc(id).ref.get();
  }

  pushComment(userId: string, comment: string) {
    return this.db.collection("Comments").add({"uid": userId,"content": comment});
  }

  updateIssueReactions(idCom: string, idIssue: string) {
    return this.db.collection("Issues").doc(idIssue)
    .update({reactions : firebase.firestore.FieldValue.arrayUnion(idCom)});
  }

  getComment(idCom: string) {
    return this.db.collection("Comments").doc(idCom).ref.get();
  }

  getUserById(uid: string) {
    return this.db.collection("Users").doc(uid).ref.get();
  }

  updateEmail(newEmail: string){
    return this.firAuth.auth.currentUser.updateEmail(newEmail);
  }


  // updateUser(newProfile: RegisterModel) {
  //   let emailPromise: Observable<any> = null;
  //   let emailDBPromise: Observable<any> = null;
  //   let namePromise: Observable<any> = null;
  //   let nameDBPromise: Observable<any> = null;
  //   let passwordPromise: Observable<any> = null;
  //   let jobStatusPromise: Observable<any> = null;
  //   let neededRequests = new Array<Observable<any>>();

  //   if (!(newProfile.email === "" || newProfile.email === null)) {
  //     console.log(newProfile.email);
  //    emailPromise = from(this.firAuth.auth.currentUser.updateEmail(newProfile.email).then(value=> {console.log(value);
  //    }));
  //    emailDBPromise = from(this.db.collection("Users").doc(this.getUserData().uid).update({email: newProfile.email}));
  //    neededRequests.push(emailPromise, emailDBPromise);
  //   }
  //   if (!(newProfile.password === "" || newProfile.password === null)) {
  //     console.log(newProfile.password);

  //     passwordPromise = from(this.firAuth.auth.currentUser.updatePassword(newProfile.password));
  //     neededRequests.push(passwordPromise);
  //   }
  //   if (!(newProfile.name === "" || newProfile.name === null)) {
  //     console.log(newProfile.name);

  //     namePromise = from(this.firAuth.auth.currentUser.updateProfile({displayName: newProfile.name}));
  //     nameDBPromise = from(this.db.collection("Users").doc(this.getUserData().uid).update({name: newProfile.name}));
  //     neededRequests.push(namePromise, nameDBPromise);
  //   }
  //   if (!(newProfile.jobstatus === "" || newProfile.jobstatus === null)) {
  //     console.log(newProfile.jobstatus);

  //     jobStatusPromise = from(this.db.collection("Users").doc(this.getUserData().uid).update({jobstatus: newProfile.jobstatus}));
  //     neededRequests.push(jobStatusPromise);
  //   }

  //   return forkJoin(neededRequests);
  // }
}
