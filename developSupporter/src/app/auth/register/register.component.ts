import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './../../models/register.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;

  constructor() { }

  ngOnInit(): void {
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
  }

  validationRepeatPassword(group: FormGroup) {
    let pass = group.get('passwordFirst').value;
    let confirmPass = group.get('repeatPassword').value;
    return pass === confirmPass ? null : { 'notSame' : true };
  }
}
