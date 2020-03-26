import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../entities/register';
import { FormGroup, Validators, FormControl, FormArray, Form } from '@angular/forms';
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
  loading = false;

  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit(): void {
    this.firebaseServ.eventAuthError.subscribe(result => {
      this.errorAuth = result;
      this.loading = false;
    });
    this.errorAuth = null;

    this.firebaseServ.eventAuthCompletetion.subscribe(result => {
      if(result) {
        console.log("Done");
        this.loading = false;
      }else {
        console.log("Horribly wrong");
      }
    })

    this.registerForm = new FormGroup({
      'name': new FormControl("", [
                Validators.required,
                Validators.minLength(2)
      ]),
      'status': new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      'email': new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      'knowledges': new FormArray([]),
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
    this.errorAuth = null;
    this.loading = true;
    this.user.name = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.passwordGroup.passwordFirst;
    this.user.jobstatus = this.registerForm.value.status;
    this.user.knowledges = this.registerForm.value.knowledges;

    this.firebaseServ.createUser(this.user);
  }

  validationRepeatPassword(group: FormGroup) {
    let pass = group.get('passwordFirst').value;
    let confirmPass = group.get('repeatPassword').value;
    return pass === confirmPass ? null : { 'notSame' : true };
  }

  onAddKnowledge() {
    const control = new FormControl("",[
      Validators.minLength(2),
      Validators.required
    ]);
    // let name = "know"+this.knowladgeForm.length;
    this.knowledgeForm.push(control);
  }

  onRemoveKnowledge(i: number){
    this.knowledgeForm.removeAt(i);
  }

  get knowledgeForm() {
    return this.registerForm.get('knowledges') as FormArray;
  }
}
