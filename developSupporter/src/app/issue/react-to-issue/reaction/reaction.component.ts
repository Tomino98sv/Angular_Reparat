import { Component, OnInit, Input } from '@angular/core';
import { CommentObject } from './../../../entities/comment';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

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

  constructor(public service: FirebaseServiceService) { }

  ngOnInit(): void { 
    this.editForm = new FormGroup({
      "editComment" : new FormControl(this.commentElement.content,[
        Validators.minLength(2),
        Validators.required
      ])
    })
  }

  onDeleteComment() {
    this.service.deleteComment(this.issueID, this.commentElement.idComment);
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
