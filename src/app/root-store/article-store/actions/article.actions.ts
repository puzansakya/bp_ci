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

// load article collection
export const LOAD_AUTHOR_ARTICLES = '[Articles] Load Author Articles';
export const LOAD_AUTHOR_ARTICLES_SUCCESS = '[Articles] Load Author Articles Success';
export const LOAD_AUTHOR_ARTICLES_FAIL = '[Articles] Load Author Articles Fail';

export class LoadAuthorArticles implements Action {
    readonly type = LOAD_AUTHOR_ARTICLES;
    constructor(public payload: number) { }
}

export class LoadAuthorArticlesSuccess implements Action {
    readonly type = LOAD_AUTHOR_ARTICLES_SUCCESS;
    constructor(public payload: Articles) { }
}

export class LoadAuthorArticlesFail implements Action {
    readonly type = LOAD_AUTHOR_ARTICLES_FAIL;
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


// load article collection
export const LOAD_BOOKMARK_ARTICLES = '[Articles] Load Bookmark Articles';
export const LOAD_BOOKMARK_ARTICLES_SUCCESS = '[Articles] Load Bookmark Articles Success';
export const LOAD_BOOKMARK_ARTICLES_FAIL = '[Articles] Load Bookmark Articles Fail';

export class LoadBookmarkArticles implements Action {
    readonly type = LOAD_BOOKMARK_ARTICLES;
    constructor(public payload: number) {        }
}

export class LoadBookmarkArticlesSuccess implements Action {
    readonly type = LOAD_BOOKMARK_ARTICLES_SUCCESS;
    constructor(public payload: Articles) { }
}

export class LoadBookmarkArticlesFail implements Action {
    readonly type = LOAD_BOOKMARK_ARTICLES_FAIL;
    constructor(public payload: any) { }
}


// load mystories collection
export const LOAD_MYSTORIES_ARTICLES = '[Articles] Load MyStories Articles';
export const LOAD_MYSTORIES_ARTICLES_SUCCESS = '[Articles] Load MyStories Articles Success';
export const LOAD_MYSTORIES_ARTICLES_FAIL = '[Articles] Load MyStories Articles Fail';

export class LoadMyStoriesArticles implements Action {
    readonly type = LOAD_MYSTORIES_ARTICLES;
    constructor(public payload: number) {        }
}

export class LoadMyStoriesArticlesSuccess implements Action {
    readonly type = LOAD_MYSTORIES_ARTICLES_SUCCESS;
    constructor(public payload: Articles) { }
}

export class LoadMyStoriesArticlesFail implements Action {
    readonly type = LOAD_MYSTORIES_ARTICLES_FAIL;
    constructor(public payload: any) { }
}

// create bookmark
export const BOOKMARK = '[Articles] Bookmark';
export const BOOKMARK_FAIL = '[Articles] Bookmark Fail';
export const BOOKMARK_SUCCESS = '[Articles] Bookmark Success';

export class Bookmark implements Action {
    readonly type = BOOKMARK;
    constructor(public payload: Article) {}
}

export class BookmarkSuccess implements Action {
    readonly type = BOOKMARK_SUCCESS;
    constructor(public payload: string) { }
}

export class BookmarkFail implements Action {
    readonly type = BOOKMARK_FAIL;
    constructor(public payload: any) { }
}

// remove bookmark
export const BOOKMARK_REMOVE = '[Articles] Bookmark Remove';

export class BookmarkRemove implements Action {
    readonly type = BOOKMARK_REMOVE;
    constructor(public payload: Article) { }
}

// reset article store
export const RESET = '[Articles] Reset';

export class Reset implements Action {
    readonly type = RESET;
    constructor() { }
}

// action types
export type ArticleAction =
    | LoadArticle | LoadArticleFail | LoadArticleSuccess
    | LoadArticles | LoadArticlesSuccess | LoadArticlesFail
    | CreateArticle | CreateArticleSuccess | CreateArticleFail
    | Bookmark | BookmarkSuccess | BookmarkFail | BookmarkRemove
    | LoadAuthorArticles | LoadAuthorArticlesSuccess | LoadAuthorArticlesFail
    | LoadBookmarkArticles | LoadBookmarkArticlesSuccess | LoadBookmarkArticlesFail
    | LoadMyStoriesArticles | LoadMyStoriesArticlesSuccess | LoadMyStoriesArticlesFail
    | Reset;
