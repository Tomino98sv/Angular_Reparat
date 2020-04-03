import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-issue',
  templateUrl: './comment-issue.component.html',
  styleUrls: ['./comment-issue.component.css']
})
export class CommentIssueComponent implements OnInit {
  @Output() completedComm = new EventEmitter<string>();
  @Output() closeWindowEmit = new EventEmitter<boolean>();
  contentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.contentForm = new FormGroup({
      "answer" : new FormControl("",[
        Validators.required,
        Validators.minLength(2)
      ]
      )
    });
  }

  onSubmit() {
      this.completedComm.emit(this.contentForm.value.answer);
      this.contentForm.reset();
      this.contentForm.get("answer").setErrors(null);
  }

  closeWindow() {
    this.closeWindowEmit.emit(false);
  }

}
