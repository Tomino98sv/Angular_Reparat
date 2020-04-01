import { Injectable } from "@angular/core";
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canLeave(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class ConfirmationGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(
        component: CanComponentDeactivate, 
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return component.canLeave ? component.canLeave() : true;

    }
}