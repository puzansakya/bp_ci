// angular core
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

// store
import { Store } from '@ngrx/store';
import * as fromArticleStore from '../../root-store/article-store';
import * as fromAuthStore from '../../root-store/auth-store';

// models
import { Article } from '../../core/models/article.model';

// rxjs
import { of, Observable } from 'rxjs';
import {
    tap,
    switchMap,
    catchError,
    take,
    filter,
    map
} from 'rxjs/operators';
import { User } from '../../core/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class MyStoriesExistsGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>
    ) { }

    getFromStoreOrAPI(): Observable<any> {
        return this.authStore.select(fromAuthStore.getAuthUser).pipe(
            tap((user: User) => {
                if (user) {
                    this.articleStore.dispatch(new fromArticleStore.LoadMyStoriesArticles(user.id));
                } else {
                    this.authStore.dispatch(new fromAuthStore.Authenticated);
                }
            }),
            map(() => this.articleStore.select(fromArticleStore.getArticles)),
            switchMap((articles) => articles.pipe(
                take(1),
                filter((articles: Article[]) => !articles.length),
            ))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.articleStore.dispatch(new fromArticleStore.Reset())
        return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }
}
