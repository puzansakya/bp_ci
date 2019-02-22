import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
    of,
    asyncScheduler,
    Observable
} from 'rxjs';
import {
    map,
    switchMap,
    catchError,
    debounceTime
} from 'rxjs/operators';

import * as articleActions from '../actions/article.actions';
import * as fromServices from '../../../core/services';

@Injectable()
export class ArticleEffects {
    constructor(
        private actions$: Actions,
        private articleService: fromServices.ArticleService
    ) { }

    @Effect()
    loadArticles$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        // debounceTime(debounce, scheduler),
        ofType(articleActions.LOAD_ARTICLES),
        map((action: articleActions.LoadArticles) => action.payload),
        switchMap((page: number) => {
            return this.articleService
                .getArticles(page)
                .pipe(
                    map(articles => new articleActions.LoadArticlesSuccess(articles)),
                    catchError(error => of(new articleActions.LoadArticlesFail(error)))
                );
        })
    );

    @Effect()
    loadArticle$ = this.actions$.pipe(
        // debounceTime(debounce, scheduler),
        ofType(articleActions.LOAD_ARTICLE),
        map((action: articleActions.LoadArticle) => action.payload),
        switchMap((slug: string) => {            
            return this.articleService
                .getArticle(slug)
                .pipe(
                    map(article => new articleActions.LoadArticleSuccess(article)),
                    catchError(error => of(new articleActions.LoadArticleFail(error)))
                );
        })
    );

    @Effect()
    createArticle$ = this.actions$.pipe(
        ofType(articleActions.CREATE_ARTICLE),
        map((action: articleActions.CreateArticle) => action.payload),
        switchMap(payload => {
            return this.articleService
                .createArticle(payload)
                .pipe(
                    map(article => new articleActions.CreateArticleSuccess(article)),
                    catchError(error => of(new articleActions.CreateArticleFail(error)))
                );
        })
    );

    @Effect()
    bookmarkArticle$ = this.actions$.pipe(
        ofType(articleActions.BOOKMARK),
        map((action: articleActions.Bookmark) => action.payload),
        switchMap(payload => {
            return this.articleService
                .bookmarkArticle(payload)
                .pipe(
                    map(article => new articleActions.CreateArticleSuccess(article)),
                    catchError(error => of(new articleActions.CreateArticleFail(error)))
                );
        })
    );

}
