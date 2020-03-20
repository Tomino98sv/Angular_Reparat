import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './../models/register.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  user= new RegisterModel();

  constructor() { }

  ngOnInit(): void {
    this.user.name="default";
    this.user.email="default@gmail.com";
    this.user.password="123456";
  }

}
