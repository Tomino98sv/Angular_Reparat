import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/services/firebase-service.service';

export interface DeleteData {
    idIssue: string;
    idComment: string;
}

@Component({
    selector: 'dialog-delete-component',
    templateUrl: './dialog-delete.html',
    styleUrls: ['./dialog-delete.css']
})
export class DialogDeleteComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteData,
        private service: FirebaseServiceService
        ){
        }

    onAccept(): void {
        this.service.deleteComment(this.data.idIssue, this.data.idComment);
        this.dialogRef.close();
    }
    onDenied(): void {
        this.dialogRef.close();
    }
}