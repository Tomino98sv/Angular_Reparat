import { Component, OnInit, Input } from '@angular/core';
import { CommentObject } from './../../../entities/comment';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/dialogs/deleteDialog/dialog-delete';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {
  @Input() commentElement = new CommentObject();
  @Input() issueID: string;
  editForm: FormGroup;
  editing = false;
  loading = false;

  constructor(
    public service: FirebaseServiceService,
    private deleteDialog: MatDialog) { }

  ngOnInit(): void { 
    this.editForm = new FormGroup({
      "editComment" : new FormControl(this.commentElement.content,[
        Validators.minLength(2),
        Validators.required
      ])
    })
  }

  onDeleteComment() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.deleteDialog.open(DialogDeleteComponent, {
      width: '250px',
      data: {
        idIssue: this.issueID,
        idComment: this.commentElement.idComment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editingMeth() {
    this.editing = !this.editing;
    this.editForm.get("editComment").setValue(this.commentElement.content);
  }

  onUpdateComment() {
    console.log("IssueId: ", this.issueID, " commentId: ", this.commentElement.idComment);
    this.loading = true;
    this.service
    .updateCommentContent(this.issueID, this.commentElement.idComment, this.editForm.get("editComment").value)
    .then(result => {

    }, error => {
      console.log(error);
    }).finally(() => {
      this.loading = false;
      this.editing = false;
      this.editForm.reset();
    });
  }
}
