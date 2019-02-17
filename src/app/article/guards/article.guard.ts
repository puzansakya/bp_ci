import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

import * as fromStore from '../../root-store/article-store';

@Injectable()
export class ArticleGuard implements CanActivate {
    constructor(private store: Store<fromStore.ArticleState>) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        // return this.checkStore(route.params.slug).pipe(
        //     switchMap(() => of(true)),
        //     catchError(() => of(false))
        // );
        this.store.dispatch(new fromStore.LoadArticle(route.params.slug));
        return of(true);
    }

    // checkStore(slug: string): Observable<boolean> {
    //     return this.store.select(fromStore.getArticle).pipe(
    //         map(article => {
    //             console.log('ArticleGuard checkStore');
    //             if (article.heading !== slug || !article) {
    //                 this.store.dispatch(new fromStore.LoadArticle(slug));
    //             }
    //         }),
    //         map(val => !!val)
    //     );
    // }
}
