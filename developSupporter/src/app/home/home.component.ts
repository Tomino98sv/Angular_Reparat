import { Component, OnInit } from '@angular/core';
import { Issue } from './../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issueArray = new Array<Issue>();
  error = null;
  loading = true;

  constructor(
    private service: FirebaseServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.fetchData()
    .subscribe((snapshot) => {
      snapshot.forEach(doc => {        
        let dataI = doc.data();
        this.issueArray.push(
          new Issue(
            doc.id,
            dataI.userName,
            dataI.uidAuthor,
            dataI.title,
            dataI.content,
            dataI.reactions
          )
        );
      });
      this.loading = false;
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  changeState(issue: Issue) {
      this.router.navigate(['/home', 'readIssue'], {queryParams: {
      id: issue.idDoc
    }});
  }

}
