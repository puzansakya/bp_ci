import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import {
    tap,
    switchMap,
    catchError,
    take,
    filter,
    map
} from 'rxjs/operators';
import {
    of,
    Observable
} from 'rxjs';

// store imports
import * as fromArticleStore from '../../root-store/article-store';
import * as fromAuthStore from '../../root-store/auth-store';

import { SeoService } from '../../core/services';
import { Article } from '../../core/models/article.model';
import { User } from '../../core/models/user.model';

@Injectable()
export class ArticleExistsGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>,
        private seo: SeoService
    ) { }

    getFromStoreOrAPI(slug: string): Observable<any> {
        return this.authStore.select(fromAuthStore.getAuthUser).pipe(
            tap((user: User) => {
                if (user) {
                    this.articleStore.dispatch(new fromArticleStore.LoadArticle(slug));
                } else {
                    this.authStore.dispatch(new fromAuthStore.Authenticated);
                }
            }),
            map(() => this.articleStore.select(fromArticleStore.getArticle)), // <-- dispatch loadbookmark action and return articleselectobservable
            switchMap((article) => article.pipe(
                take(1),
                filter((article: Article) => article.user.id === user.id),
            ))
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getFromStoreOrAPI(route.params.slug).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }
}
