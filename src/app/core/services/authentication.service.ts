import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { PLATFORM_ID } from '@angular/core';
import { User } from '../models/user.model';

// global objects for ssr;
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) public platformId: Object,
        @Inject(LOCAL_STORAGE) private localStorage: any
    ) { }

    public getAuthUser(): User {               
        return isPlatformBrowser(this.platformId) && JSON.parse(this.localStorage.getItem('currentUser'))        
    }

    login(email: string, password: string) {
        return this.http.post<any>(`https://medium-puzan.herokuapp.com/api/v1/user/login`, { email, password })
            .pipe(map(user => {                
                if (user && user.token) {
                    this.localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        this.localStorage.removeItem('currentUser');
    }
}