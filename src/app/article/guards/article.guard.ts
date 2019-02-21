import { Injectable, OnInit } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import {
    flatMap,
    map,
    tap,
    switchMap,
    catchError,
    take,
    filter,
    first,
    takeLast,
    concat,
    delay
} from 'rxjs/operators';
import {
    of,
    Observable,
    combineLatest
} from 'rxjs';

// store imports
import * as fromArticleStore from '../../root-store/article-store';
import * as fromAuthStore from '../../root-store/auth-store';
import { SeoService } from '../../core/services';
import { Article } from '../../core/models/article.model';
import { User } from '../../core/models/user.model';

@Injectable()
export class ArticleGuard implements CanActivate {

    constructor(
        private articleStore: Store<fromArticleStore.ArticleState>,
        private authStore: Store<fromAuthStore.AuthState>,
        private seo: SeoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        // this.checkStore()
        //     .subscribe(x => console.log('PROF X', x));
        // this.articleStore.dispatch(new fromArticleStore.LoadArticle(route.params.slug));
        // this.checkTest(route.params.slug);
        let slug = route.params.slug;
        this.checkTest(slug);
        return this.checkArticle(slug).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
        // return of(true);
        // let articleSlug;
        // let slug = route.params.slug;
        // this.articleStore.select(fromArticleStore.getArticle).pipe(
        //     take(1)
        // ).subscribe((article: Article) => {
        //     console.log(article.slug);
        //     articleSlug = article.slug;
        // });

        // if (articleSlug !== slug) {
        //     this.articleStore.dispatch(new fromArticleStore.LoadArticle(slug));
        // }
        // return of(true);
    }

    /**
     * Checks if the authenticated user id and article's author id matches
     *      
     * @returns {Observable<boolean>}
     */
    checkStore(): Observable<boolean> {

        // take the multiple observable and combines them
        // somehow needs to handle unsubscription
        return combineLatest(
            this.articleStore.select(fromArticleStore.getArticle),
            this.authStore.select(fromAuthStore.getAuthUser)
        ).pipe(
            flatMap(([first, second]) => {
                // checking user id with author id
                // combineLatest returns an array of values, here we map those values to an object
                return first && first.user.id === second.id ? of(true) : of(false);
            })
        );
    }

    /**
     * 
     * @param slug check 
     */
    checkArticle(slug: string): Observable<boolean> {
        return this.articleStore.select(fromArticleStore.getArticle).pipe(
            tap(article => {
                if (article === null || article.slug !== slug) {
                    this.articleStore.dispatch(new fromArticleStore.LoadArticle(slug))
                }
            }),
            map((article: Article) => !!article),
            take(1)
        )
        // .subscribe();
    }

    checkUser(slug: string): Observable<boolean> {
        return this.articleStore.select(fromArticleStore.getArticle).pipe(
            take(1),
            map(article => article),
            switchMap(article => {
                return this.authStore.select(fromAuthStore.getAuthUser)
                    .pipe(
                        take(1),
                        map(user => user),
                        switchMap(user => {
                            return user.id === article.user.id ? of(true) : of(false);
                        })
                    )
            }))
    }

    checkTest(slugger: string) {

        interface IUser {
            id?: number,
            username?: string,
        }
        interface IArticle {
            id?: number,
            title?: string,
            user_id?: number,
            slug?: string
        }
        const user: IUser = {
            id: 1,
            username: 'puzansakya',
        }
        const article: IArticle = {
            id: 1,
            title: 'Article title 1',
            slug: 'article1',
            user_id: 3
        }
        const articleStore: IArticle = {
            id: 1,
            title: 'Article title 1',
            slug: 'how-to-improve-your-javascript-skills-by-writing-your-own-web-development-framework',
            user_id: 3
        }

        const userObservable = of(user).pipe(delay(2000));
        const articleObservable = of(article);
        const articleStoreObservable = of(articleStore);

        const checkUserObservable = articleObservable.pipe(
            take(1),
            map(article => article),
            switchMap(article => {
                return userObservable
                    .pipe(
                        take(1),
                        map(user => user),
                        switchMap(user => {
                            return user.id === article.user_id ? of(true) : of(false);
                        })
                    )
            })
        )

        const checkSlugObservable = this.articleStore.select(fromArticleStore.getArticle).pipe(
            take(1),
            map(articleStore => articleStore),
            tap(articleStore => {
                console.log('debug1');
                if (slugger !== articleStore.slug) {
                    console.log('debug2');
                    this.articleStore.dispatch(new fromArticleStore.LoadArticle(slugger))
                }
            }),
            map(articleStore => !!articleStore)
        )

        of('Start').pipe(
            concat(
                of('', '===============', 'Start checkuser:', '===============', ''),
                checkUserObservable,
                of('', '===============', 'End checkuser:', '===============', ''),
                of('', '===============', 'Start checkSlug:', '===============', ''),
                checkSlugObservable,
                of('', '===============', 'End checkSlug:', '===============', ''),
            )
        ).subscribe(x => console.log(x));

    }
}
