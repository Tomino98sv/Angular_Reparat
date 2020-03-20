import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterModel } from 'src/app/models/register.model';
import { FirebaseServiceService } from 'src/services/firebase-service.service';


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

  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit(): void {
    this.firebaseServ.eventAuthError.subscribe(error => {
      this.errorAuth = error;
    });
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
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    
    this.firebaseServ.login(this.user.email,this.user.password);
  }

}
