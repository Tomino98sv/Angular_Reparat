import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from './../entities/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() data: Issue;
  @Output() readIssue = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  readCurrentIssue() {
    this.readIssue.next(this.data.idDoc);
  }
}
