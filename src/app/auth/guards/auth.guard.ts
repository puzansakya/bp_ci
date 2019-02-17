import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import * as _ from 'lodash';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) public platformId: Object
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('currentUser')) : null;
        if (currentUser) {
            let roles = currentUser.roles;
            let expectedRole = route.data.expectedRole;

            if (_.includes(roles, 'ADMIN')) {
                return true;
            }

            if (_.intersection(expectedRole, roles).length > 0) {
                return true;
            }

            // authorised so return true            
            return false;
        }        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;

    }    

}