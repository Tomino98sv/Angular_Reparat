import { Component, OnInit } from '@angular/core';
import { Issue } from './../entities/issue';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issueArray = new Array<Issue>();
 

  constructor() { }

  ngOnInit(): void {
    let issue: Issue = new Issue(
      "SFSFSEFS6E4FSE64F6SE46F",
      "Boris Galcin",
      "SFSFSEFS6E4FSE64F6SE46F",
      "NullPointerException",
      "No ta toto mi nejako prejebalo cez hlavu"
    );
    this.issueArray.push(issue);
    this.issueArray.push(issue);
    this.issueArray.push(issue);

  }

}
