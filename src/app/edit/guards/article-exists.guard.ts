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
    Observable,
    forkJoin,
    combineLatest
} from 'rxjs';

// store imports
import * as fromArticleStore from '../../root-store/article-store';
import * as fromAuthStore from '../../root-store/auth-store';

@Injectable()
export class ArticleExistsGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>
    ) { }

    getFromStoreOrAPI(slug: string): Observable<boolean> {
        return combineLatest(
            this.articleStore.select(fromArticleStore.getArticle),
            this.authStore.select(fromAuthStore.getAuthUser)
        ).pipe(
            tap(([article, user]) => {
                if (!article || (article && article.slug !== slug)) {
                    this.articleStore.dispatch(new fromArticleStore.LoadArticle(slug));
                }
                if (!user) {
                    this.authStore.dispatch(new fromAuthStore.Authenticated);
                }
            }),
            map(([article, user]) => {
                if (article) return article.user.id === user.id;
            }),
            take(1)
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getFromStoreOrAPI(route.params.slug).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );        
    }
}
