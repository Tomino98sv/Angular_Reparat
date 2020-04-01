import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-unauthorized-component',
    templateUrl: './dialog-unauthorized.html',
    styleUrls: ['./dialog-unauthorized.css']
})
export class DialogUnAuthorizedComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogUnAuthorizedComponent>,
        private router: Router
        ){}

    onNoClick() : void {
        this.dialogRef.close();
    }
    onLoginClick() : void {
        this.dialogRef.close();
        this.router.navigateByUrl('/login');
    }
    onRegisterClick() : void {
        this.dialogRef.close();
        this.router.navigateByUrl('/register');
    }
}