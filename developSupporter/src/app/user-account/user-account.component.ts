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
  user = new RegisterModel();
  loading = true;

  constructor(
    private serviceAuth: FirebaseServiceService,
    private route: Router) { }
  ngOnInit(): void {
    this.serviceAuth.getUserDataFromDB()
    .then(doc => {
      this.user = (<RegisterModel>{...doc.data()});
      this.user.password = localStorage.getItem("password");
    }).finally(()=>{this.loading = false });
  }

  logOut() {
    this.serviceAuth.logout();
    this.route.navigate(['/login']);
  }

}
