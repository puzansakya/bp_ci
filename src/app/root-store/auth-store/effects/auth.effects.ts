import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import * as fromServices from '../../../core/services';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { PLATFORM_ID } from '@angular/core';
import { User } from '../../../core/models/user.model';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: fromServices.AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) public platformId: Object
    ) { }

    @Effect()
    Authenticated$: Observable<any> = this.actions$
        .pipe(
            ofType(authActions.AuthActionTypes.AUTHENTICATED),
            switchMap(payload => {
                return new BehaviorSubject<User>(this.authService.getAuthUser())
                    .pipe(
                        map(user => new authActions.AuthenticatedSuccess({ authenticated: (user !== null), user: user })),
                        catchError(error => of(new authActions.AuthenticatedFailure(error)))
                    );
            })
        );

    @Effect({ dispatch: false })
    redirect$: Observable<any> = this.actions$
        .pipe(
            ofType(authActions.AuthActionTypes.REDIRECT),
            tap(data => {
                if (this.authService.getAuthUser()) {
                    this.router.navigate(['/']);
                }
            })
        );

    @Effect()
    login$: Observable<any> = this.actions$
        .pipe(
            ofType(authActions.AuthActionTypes.LOGIN),
            map((action: authActions.Login) => action.payload),
            switchMap(payload => {
                return this.authService
                    .login(payload.email, payload.password)
                    .pipe(
                        map(user => new authActions.LoginSuccess(user)),
                        catchError(error => of(new authActions.LoginFailure(error)))
                    );
            })
        );


    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions$
        .pipe(
            ofType(authActions.AuthActionTypes.LOGIN_SUCCESS),
            tap(user => {
                this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
            })
        );


    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions$
        .pipe(
            ofType(authActions.AuthActionTypes.LOGOUT),
            tap(() => {
                this.authService.logout();
                this.router.navigate(['/login']);
            })
        );

}
