import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../entities/register';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  user= new RegisterModel();
  fireUser: firebase.User;

  constructor(
    private serviceAuth: FirebaseServiceService,
    private route: Router) { }
0
  ngOnInit(): void {
    this.fireUser = this.serviceAuth.getUserData();
    console.log(this.fireUser);
    
    this.user.name=this.fireUser.displayName;
    this.user.email=this.fireUser.email;
    this.user.password=localStorage.getItem("password");
    this.user.name = this.fireUser.displayName;
  }

  logOut() {
    this.serviceAuth.logout();
    this.route.navigate(['/login']);
  }

}
