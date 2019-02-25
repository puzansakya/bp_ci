import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from '../../core/models/article.model';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
    tap,
    switchMap,
    catchError,
    take,
    filter
} from 'rxjs/operators';
import * as fromArticleStore from '../../root-store/article-store';
import { getArticles } from '../../root-store/article-store';

@Injectable({
    providedIn: 'root'
})
export class BookmarkExistsGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
    ) { }

    getFromStoreOrAPI(authorId: number): Observable<any> {
        console.log('guards called');
        return this.articleStore
            .select(getArticles).pipe(
                tap((articles: Article[]) => {
                    if (articles) {
                        console.log(articles);
                    }
                    if (!articles || (articles && !articles.length)) {
                        this.articleStore.dispatch(new fromArticleStore.LoadBookmarkArticles(authorId));
                    }
                }),
                filter((articles: Article[]) => !articles.length),
                take(1)
            );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        console.log(route.params.authorId);
        this.articleStore.dispatch(new fromArticleStore.Reset())
        // this.articleStore.dispatch(new fromArticleStore.LoadAuthorArticles(route.params.authorId));
        return this.getFromStoreOrAPI(route.params.authorId).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );

        // return of(true);
    }
}
