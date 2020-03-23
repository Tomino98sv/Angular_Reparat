import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterModel } from 'src/app/entities/register';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { error } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  loginForm: FormGroup;
  hide = true;
  errorAuth: string;
  loading =false;

  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit(): void {
    this.firebaseServ.eventAuthError.subscribe(error => {
      this.errorAuth = error;
      this.loading = false;
    });
    this.firebaseServ.eventAuthCompletetion.subscribe(result => {
      if(result) {
        console.log("Done");
        this.loading = false;
      }else {
        console.log("Horribly wrong");
      }
    });

    this.errorAuth=null;
    this.loginForm = new FormGroup({
      'email': new FormControl("", [
          Validators.required,
          Validators.email
      ]),
      'password': new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ])
    });
  }

  onLoginSubmit() {
    this.loading = true;
    this.errorAuth =null;
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    
    this.firebaseServ.login(this.user.email,this.user.password);
  }

}
