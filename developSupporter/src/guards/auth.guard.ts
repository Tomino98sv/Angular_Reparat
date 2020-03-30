import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUnAuthorizedComponent } from 'src/dialogs/dialog-unauthorized';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private serviceAuth: FirebaseServiceService,
        public dialog: MatDialog){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot,): boolean{

        if(this.serviceAuth.isLogged()) {
            return true;
        }else {
            this.openDialog();
            return false;
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogUnAuthorizedComponent, {
          width: '250px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
}