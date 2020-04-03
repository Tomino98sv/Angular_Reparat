import { Component, OnInit, Input } from '@angular/core';
import { CommentObject } from './../../../entities/comment';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { error } from 'protractor';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {
  @Input() commentElement = new CommentObject();
  @Input() issueID: string;

  constructor(public service: FirebaseServiceService) { }

  ngOnInit(): void { 
  }

  onDeleteComment() {
    this.service.deleteComment(this.issueID,this.commentElement.idComment);
  }
  onUpdateComment() {

  }
}
