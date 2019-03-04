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
    debounceTime,
    exhaustMap
} from 'rxjs/operators';

import * as articleActions from '../actions/article.actions';
import * as fromServices from '../../../core/services';
import { ToastrService } from 'ngx-toastr';

import * as fromRoot from '../../router-store';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {
    constructor(
        private actions$: Actions,
        private articleService: fromServices.ArticleService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    @Effect()
    loadArticles$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        debounceTime(debounce, scheduler),
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
    loadAuthorArticles$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        // debounceTime(debounce, scheduler),
        ofType(articleActions.LOAD_AUTHOR_ARTICLES),
        map((action: articleActions.LoadArticles) => action.payload),
        switchMap((authorId: number) => {
            return this.articleService
                .getArticlesByAuthor(authorId)
                .pipe(
                    map(articles => new articleActions.LoadAuthorArticlesSuccess(articles)),
                    catchError(error => of(new articleActions.LoadAuthorArticlesFail(error)))
                );
        })
    );

    @Effect()
    loadBookmarkedArticles$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        // debounceTime(debounce, scheduler),
        ofType(articleActions.LOAD_BOOKMARK_ARTICLES),
        map((action: articleActions.LoadBookmarkArticles) => action.payload),
        switchMap((authorId: number) => {
            return this.articleService
                .getBookmarkedArticles(authorId)
                .pipe(
                    map(articles => new articleActions.LoadBookmarkArticlesSuccess(articles)),
                    catchError(error => of(new articleActions.LoadBookmarkArticlesFail(error)))
                );
        })
    );

    @Effect()
    loadMyStoriesArticles$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        // debounceTime(debounce, scheduler),
        ofType(articleActions.LOAD_MYSTORIES_ARTICLES),
        map((action: articleActions.LoadBookmarkArticles) => action.payload),
        switchMap((authorId: number) => {
            return this.articleService
                .getMyStoriesArticles(authorId)
                .pipe(
                    map(articles => new articleActions.LoadMyStoriesArticlesSuccess(articles)),
                    catchError(error => of(new articleActions.LoadMyStoriesArticlesFail(error)))
                );
        })
    );

    @Effect()
    loadArticle$ = this.actions$.pipe(
        ofType(articleActions.LOAD_ARTICLE),
        map((action: articleActions.LoadArticle) => action.payload),
        exhaustMap((slug: string) => { // exhaustMap --> causee we want first proces to complete and igonre new processes
            return this.articleService
                .getArticle(slug)
                .pipe(
                    map(article => new articleActions.LoadArticleSuccess(article)),
                    catchError(error => {                    
                        return of(new articleActions.LoadArticleFail(error));
                    })
                );
        })
    );

    @Effect()
    loadArticleFail$ = this.actions$
        .pipe(
            ofType(articleActions.LOAD_ARTICLE_FAIL),
            map((action: articleActions.LoadArticleFail) => action.payload),
            map(error => {
                console.log('called failed');
                return new fromRoot.Go({
                    path: ['404'],
                });                
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
                    map(article => {
                        this.toastr.success('Article created!');
                        return new articleActions.CreateArticleSuccess(article);
                    }),
                    catchError(error => {
                        this.toastr.error('Article creation failed!');
                        return of(new articleActions.CreateArticleFail(error))
                    })
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

    @Effect()
    bookmarkRemoveArticle$ = this.actions$.pipe(
        ofType(articleActions.BOOKMARK_REMOVE),
        map((action: articleActions.BookmarkRemove) => action.payload),
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
