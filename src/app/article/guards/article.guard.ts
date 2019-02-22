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
    filter
} from 'rxjs/operators';
import {
    of,
    Observable
} from 'rxjs';

// store imports
import * as fromArticleStore from '../../root-store/article-store';
import { SeoService } from '../../core/services';
import { Article } from '../../core/models/article.model';
import { getArticle } from '../../root-store/article-store';

@Injectable()
export class ArticleGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private seo: SeoService
    ) { }

    getFromStoreOrAPI(slug: string): Observable<any> {
        return this.articleStore
            .select(getArticle).pipe(
                tap((article: Article) => {                    
                    if (!article || (article && article.slug !== slug)) {
                        this.articleStore.dispatch(new fromArticleStore.LoadArticle(slug));
                    } else {
                        this.seo.generateTags({
                            title: article.heading,
                            description: article.description,
                            image: article.backdrop,
                            slug: article.slug
                        });
                    }
                }),
                filter((data: any) => { return data && data.slug === slug }),
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
