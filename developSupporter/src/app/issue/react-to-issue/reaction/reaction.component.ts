import { Component, OnInit, Input } from '@angular/core';
import { CommentObject } from './../../../entities/comment';
import { FirebaseServiceService } from 'src/services/firebase-service.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {
  @Input() commentElement = new CommentObject();

  constructor(public service: FirebaseServiceService) { }

  ngOnInit(): void {
  }

}
