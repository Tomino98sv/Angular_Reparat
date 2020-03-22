import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FirebaseServiceService } from 'src/services/firebase-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private serviceAuth: FirebaseServiceService){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean{
        
        if(this.serviceAuth.isLogged()) {
            return true;
        }else {
            alert("Damn you must be logged in")
            return false;
        }
    }
}