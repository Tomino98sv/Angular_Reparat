import { Component, OnInit, Input } from '@angular/core';
import { Issue } from './../entities/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  @Input() data: Issue;

  constructor() { }

  ngOnInit(): void {
  }

}
