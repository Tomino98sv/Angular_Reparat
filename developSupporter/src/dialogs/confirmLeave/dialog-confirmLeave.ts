import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-confirmLeave-component',
    templateUrl: './dialog-confirmLeave.html',
    styleUrls: ['./dialog-confirmLeave.css']
})
export class DialogConfirmLeaveComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmLeaveComponent>,
        private router: Router
        ){
        }

    onContinueClick(): void {
        this.dialogRef.close(true);
    }
    onCancelClick(): void {
        this.dialogRef.close(false);
    }
}