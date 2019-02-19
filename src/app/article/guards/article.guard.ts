import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { of, Observable, combineLatest } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import * as fromArticleStore from '../../root-store/article-store';
import * as fromAuthStore from '../../root-store/auth-store';

@Injectable()
export class ArticleGuard implements CanActivate {

    values$ = combineLatest(
        this.articleStore.select(fromArticleStore.getArticle),
        this.authStore.select(fromAuthStore.getAuthUser)
    ).pipe(
        map(([first, second]) => {
            // combineLatest returns an array of values, here we map those values to an object
            return { first, second };
        })
    );

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {        
        this.checkStore()
            .subscribe(x => console.log('PROF X', x));
        this.articleStore.dispatch(new fromArticleStore.LoadArticle(route.params.slug));
        return of(true);
    }

    /**
     * 
     */
    checkStore(): Observable<boolean> {

        // take the multiple observable and combines them
        // somehow needs to handle unsubscription
        return combineLatest(
            this.articleStore.select(fromArticleStore.getArticle),
            this.authStore.select(fromAuthStore.getAuthUser)
        ).pipe(
            flatMap(([first, second]) => {
                return first && first.user.id === second.id ? of(true) : of(false);
            })
        );
    }
}
