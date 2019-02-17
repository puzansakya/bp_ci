import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorExistsGuard implements CanActivate {

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {                        
        return of(true);
    }
}
