import { Action } from '@ngrx/store';
import { Article } from '../../../core/models/article.model';
import { Articles } from '../../../core/models/articles.model';

// load article collection
export const LOAD_ARTICLES = '[Articles] Load Articles';
export const LOAD_ARTICLES_SUCCESS = '[Articles] Load Articles Success';
export const LOAD_ARTICLES_FAIL = '[Articles] Load Articles Fail';

export class LoadArticles implements Action {
    readonly type = LOAD_ARTICLES;
    constructor(public payload: number) { }
}

export class LoadArticlesSuccess implements Action {
    readonly type = LOAD_ARTICLES_SUCCESS;
    constructor(public payload: Articles) { }
}

export class LoadArticlesFail implements Action {
    readonly type = LOAD_ARTICLES_FAIL;
    constructor(public payload: any) { }
}

// load single article
export const LOAD_ARTICLE = '[Articles] Load Article';
export const LOAD_ARTICLE_SUCCESS = '[Articles] Load Article Success';
export const LOAD_ARTICLE_FAIL = '[Articles] Load Article Fail';

export class LoadArticle implements Action {
    readonly type = LOAD_ARTICLE;
    constructor(public payload: string) { }
}

export class LoadArticleSuccess implements Action {
    readonly type = LOAD_ARTICLE_SUCCESS;
    constructor(public payload: Article) { }
}

export class LoadArticleFail implements Action {
    readonly type = LOAD_ARTICLE_FAIL;
    constructor(public payload: any) { }
}


// create article
export const CREATE_ARTICLE = '[Articles] Create Article';
export const CREATE_ARTICLE_FAIL = '[Articles] Create Article Fail';
export const CREATE_ARTICLE_SUCCESS = '[Articles] Create Article Success';

export class CreateArticle implements Action {
    readonly type = CREATE_ARTICLE;
    constructor(public payload: { article: Article, buffer: File }) { }
}

export class CreateArticleSuccess implements Action {
    readonly type = CREATE_ARTICLE_SUCCESS;
    constructor(public payload: Article) { }
}

export class CreateArticleFail implements Action {
    readonly type = CREATE_ARTICLE_FAIL;
    constructor(public payload: any) { }
}

// create bookmark
export const BOOKMARK = '[Articles] Bookmark';
export const BOOKMARK_FAIL = '[Articles] Bookmark Fail';
export const BOOKMARK_SUCCESS = '[Articles] Bookmark Success';

export class Bookmark implements Action {
    readonly type = BOOKMARK;
    constructor(public payload: Article) {
        console.log('bookmark', payload);
    }
}

export class BookmarkSuccess implements Action {
    readonly type = BOOKMARK_SUCCESS;
    constructor(public payload: string) { }
}

export class BookmarkFail implements Action {
    readonly type = BOOKMARK_FAIL;
    constructor(public payload: any) { }
}



// action types
export type ArticleAction =
    | LoadArticle | LoadArticleFail | LoadArticleSuccess
    | LoadArticles | LoadArticlesSuccess | LoadArticlesFail
    | CreateArticle | CreateArticleSuccess | CreateArticleFail
    | Bookmark | BookmarkSuccess | BookmarkFail;
