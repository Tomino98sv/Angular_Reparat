import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { RegisterModel } from 'src/app/entities/register';

@Component({
  selector: 'app-visit-user-account',
  templateUrl: './visit-user-account.component.html',
  styleUrls: ['./visit-user-account.component.css']
})
export class VisitUserAccountComponent implements OnInit {
  user: RegisterModel;
  loading = true;


  panelOpenState = false;



  constructor(
    private ActivRoute: ActivatedRoute,
    private service: FirebaseServiceService
    ) { }

  ngOnInit(): void {
    let id = this.ActivRoute.snapshot.queryParams['id'];
    this.service.getUserById(id).then(docUser => {
      this.user = <RegisterModel>docUser.data();
    }).finally(()=> {
      this.loading = false;
    });
  }

}
