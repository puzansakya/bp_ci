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
export class BookmarkExistsGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>
    ) { }

    getFromStoreOrAPI(): Observable<any> {
        // return this.articleStore
        //     .select(getArticles).pipe(
        //         tap((articles: Article[]) => {
        //             if (articles) {
        //                 console.log(articles);
        //             }
        //             if (!articles || (articles && !articles.length)) {
        //                 this.articleStore.dispatch(new fromArticleStore.LoadBookmarkArticles(authorId));
        //             }
        //         }),
        //         filter((articles: Article[]) => !articles.length),
        //         take(1)
        //     );
        return this.authStore.select(fromAuthStore.getAuthUser).pipe(
            tap((user: User) => {
                if (user) {
                    this.articleStore.dispatch(new fromArticleStore.LoadBookmarkArticles(user.id));
                } else {
                    this.articleStore.dispatch(new fromAuthStore.Authenticated);
                }
            }),
            map(() => this.articleStore.select(fromArticleStore.getArticles)), // <-- dispatch loadbookmark action and return articleselectobservable
            switchMap((articles) => articles.pipe(
                take(1),
                filter((articles: Article[]) => !articles.length),
            ))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.articleStore.dispatch(new fromArticleStore.Reset())
        // this.articleStore.dispatch(new fromArticleStore.LoadAuthorArticles(route.params.authorId));
        return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );

        // return of(true);
    }
}
