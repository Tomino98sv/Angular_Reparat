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
      snapshot.forEach(docIssue => {
        let dataI = docIssue.data();
        this.service.getUserById(dataI.uidAuthor).then(docUser => {
          let dataU = docUser.data();
          this.issueArray.push(
            new Issue(
              docIssue.id,
              dataI.uidAuthor,
              {  name: dataU.name,jobStatus: dataU.jobstatus },
              dataI.title,
              dataI.content,
              dataI.reactions
            )
          );
        });
      });
      this.loading = false;
    }, error => {
      this.error = error;
      this.loading = false;
    });
  }

  changeState(idDocument: string) {
      this.router.navigate(['/home', 'readIssue'], {queryParams: {
      id: idDocument
    }});
  }

}
