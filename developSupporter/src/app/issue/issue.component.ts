import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from './../entities/issue';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() data: Issue;
  @Output() readIssue = new EventEmitter<string>();

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  readCurrentIssue() {
    this.readIssue.next(this.data.idDoc);
  }

  visitUserAccount() {
    this.route.navigate(['/home', 'visitUser'], {queryParams: {
      id: this.data.uidAuthor
    }});
  }
}
