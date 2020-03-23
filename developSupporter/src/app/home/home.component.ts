import { Component, OnInit } from '@angular/core';
import { Issue } from './../entities/issue';
import { FirebaseServiceService } from 'src/services/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issueArray = new Array<Issue>();
 

  constructor(private service: FirebaseServiceService) { }

  ngOnInit(): void {
    this.service.fetchData()
    .subscribe((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        let dataI = doc.data();
        this.issueArray.push(
          new Issue(
            dataI.userName,
            dataI.uidAuthor,
            dataI.title,
            dataI.content,
            dataI.reactions
          )
        );
      });
    });
  }

}
