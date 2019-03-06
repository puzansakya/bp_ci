import * as fromArticle from '../actions/article.actions';
import { Article }      from '../../../core/models/article.model';
import { paged }        from '../../../core/models/paged.model';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// create adapter
export const featureAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({
    selectId    : (article: Article) => article.id,
    sortComparer: (a1: Article, a2: Article) => {
        return a2.id - a1.id;
    },
});

// state types
export interface ArticleState extends EntityState<Article> {
    entities: { [id: number]: Article };
    entity  : Article;
    paged   : paged;
    loading : boolean;
    loaded  : boolean;
    success : string;
    error   : string;
}

export const initialState: ArticleState = featureAdapter.getInitialState({
    entities: {},
    entity  : null,
    paged   : {
        page        : 0,
        pageSize    : 0,
        rowCount    : 0,
        pageCount   : 0
    },
    loading : false,
    loaded  : false,
    success : '',
    error   : '',
});


export function reducer(
    state = initialState,
    action: fromArticle.ArticleAction
): ArticleState {
    switch (action.type) {
        case fromArticle.LOAD_ARTICLES: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromArticle.LOAD_ARTICLES_SUCCESS: {
            const articles  = action.payload;
            const paged     = articles.paged;            
            return featureAdapter.upsertMany(articles.data, {
                ...state,
                loading : false,
                loaded  : true,
                paged
            });
        }
        case fromArticle.LOAD_ARTICLES_FAIL: {
            return {
                ...state,
                loading : false,
                loaded  : false,
            };
        }
        case fromArticle.LOAD_AUTHOR_ARTICLES: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromArticle.LOAD_AUTHOR_ARTICLES_SUCCESS: {
            const articles  = action.payload;
            const paged     = articles.paged;
            return featureAdapter.addAll(articles.data, {
                ...state,
                loading : false,
                loaded  : true,
                paged
            });
        }
        case fromArticle.LOAD_ARTICLES_FAIL: {
            return {
                ...state,
                loading : false,
                loaded  : false,
            };
        }
        case fromArticle.LOAD_BOOKMARK_ARTICLES: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromArticle.LOAD_BOOKMARK_ARTICLES_SUCCESS: {
            const articles  = action.payload;
            const paged     = articles.paged;
            return featureAdapter.addAll(articles.data, {
                ...state,
                loading : false,
                loaded  : true,
                paged
            });
        }
        case fromArticle.LOAD_BOOKMARK_ARTICLES_FAIL: {
            return {
                ...state,
                loading : false,
                loaded  : false,
            };
        }
        case fromArticle.LOAD_MYSTORIES_ARTICLES: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromArticle.LOAD_MYSTORIES_ARTICLES_SUCCESS: {
            const articles  = action.payload;
            const paged     = articles.paged;
            return featureAdapter.addAll(articles.data, {
                ...state,
                loading : false,
                loaded  : true,
                paged
            });
        }
        case fromArticle.LOAD_MYSTORIES_ARTICLES_FAIL: {
            return {
                ...state,
                loading : false,
                loaded  : false,
            };
        }
        case fromArticle.LOAD_ARTICLE: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromArticle.LOAD_ARTICLE_SUCCESS: {
            const article = action.payload;

            return {
                ...state,
                loading : true,
                entity  : article,
                loaded  : true
            };
        }
        case fromArticle.LOAD_ARTICLE_FAIL: {
            return {
                ...state,
                loading : false,
                error   : action.payload,
                entity  : {}
            };
        }
        case fromArticle.CREATE_ARTICLE_SUCCESS: {
            const article   = action.payload;
            const entities  = {
                ...state.entities,
                [article.id]: article,
            };

            return {
                ...state,
                success : 'Article created!',
                entities,
            };
        }
        case fromArticle.BOOKMARK: {
            const article = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [article.id]: { ...article, bookmarked: !state.entities[article.id].bookmarked },
                },
            };
        }
        case fromArticle.BOOKMARK_REMOVE: {
            const article = action.payload;
            return featureAdapter.removeOne(article.id, state);
        }
        case fromArticle.RESET: {

            return featureAdapter.removeAll({
                ...state
            })
        }
    }

    return state;
}

export const getArticleEntities = (state: ArticleState) => state.entities;
export const getArticleEntity   = (state: ArticleState) => state.entity;
export const getArticlePaged    = (state: ArticleState) => state.paged;
export const getArticleLoading  = (state: ArticleState) => state.loading;
export const getArticleLoaded   = (state: ArticleState) => state.loaded;
export const getArticleSuccess  = (state: ArticleState) => state.success;
export const getArticleError    = (state: ArticleState) => state.error;
