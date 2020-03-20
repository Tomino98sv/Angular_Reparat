import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './../../models/register.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseServiceService } from 'src/services/firebase-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;
  errorAuth: string;

  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit(): void {
    this.firebaseServ.eventAuthError.subscribe(result => {
      this.errorAuth = result;
    });

    this.firebaseServ.eventAuthCompletetion.subscribe(result => {
      if(result) {
        console.log("Done");
      }else {
        console.log("Horribly wrong");
      }
    })

    this.registerForm = new FormGroup({
      'name': new FormControl("", [
                Validators.required,
                Validators.minLength(2)
      ]),
      'email': new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      'passwordGroup': new FormGroup({
        'passwordFirst':  new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ]),
        'repeatPassword': new FormControl("", [
          Validators.required
        ])
      }, {validators: this.validationRepeatPassword})
      
    });
  }

  onRegisterSubmit() {
    console.log(this.registerForm.value);
    this.user.name = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.passwordGroup.passwordFirst;

    this.firebaseServ.createUser(this.user);
  }

  validationRepeatPassword(group: FormGroup) {
    let pass = group.get('passwordFirst').value;
    let confirmPass = group.get('repeatPassword').value;
    return pass === confirmPass ? null : { 'notSame' : true };
  }
}
