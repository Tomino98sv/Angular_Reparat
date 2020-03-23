import { Component, OnInit } from '@angular/core';
import { Issue } from './../../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';

@Component({
  selector: 'app-react-to-issue',
  templateUrl: './react-to-issue.component.html',
  styleUrls: ['./react-to-issue.component.css']
})
export class ReactToIssueComponent implements OnInit {
  openIssue: Issue;

  constructor(private service: FirebaseServiceService) { }

  ngOnInit(): void {
    this.openIssue = this.service.currentIssue;
  }

}
