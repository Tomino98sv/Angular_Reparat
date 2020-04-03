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

    this.service.listenToChanges().onSnapshot(onSnapshot => {
      onSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          console.log("Added issue: ", change.doc.data());
            let dataI = change.doc.data();
            this.service.getUserById(dataI.uidAuthor).then(docUser => {
              let dataU = docUser.data();
              this.issueArray.push(
                new Issue(
                  change.doc.id,
                  dataI.uidAuthor,
                  {  name: dataU.name,jobStatus: dataU.jobstatus },
                  dataI.title,
                  dataI.content                
                  )
              );
            });

        }
        if (change.type === "modified") {
            console.log("Modified issue: ", change.doc.data());
            this.issueArray.forEach((item, index) => {
              if(change.doc.id === item.idDoc) {
                this.service.getUserById( change.doc.data().uidAuthor).then(docUser => {
                  let dataU = docUser.data();
                  let modifyIssue = new Issue(
                    change.doc.id,
                    change.doc.data().uidAuthor,
                    {  name: dataU.name,jobStatus: dataU.jobstatus },
                    change.doc.data().title,
                    change.doc.data().content                
                    );
                this.issueArray[index] = modifyIssue;
                });
              }
            });
        }
        if (change.type === "removed") {
            console.log("Removed issue: ", change.doc.data());
            this.issueArray.forEach((item, index) => {
              if(change.doc.id === item.idDoc) {
                this.issueArray.splice(index, 1);
              }
            });
        }
    },this.loading = false);
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
