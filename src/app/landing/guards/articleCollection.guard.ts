import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../../root-store/article-store';

@Injectable({
    providedIn: 'root'
})
export class ArticleCollectionGuard implements CanActivate {
    constructor(private store: Store<fromStore.ArticleState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getArticleLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadArticles(1));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
