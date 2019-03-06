import { createSelector }   from '@ngrx/store';

import * as fromFeature     from '../reducers';
import * as fromArticles    from '../reducers/article.reducer';

import { Article }          from '../../../core/models/article.model';

export const getArticlesState = createSelector(
    fromFeature.getArticleState,
    (state: fromFeature.ArticleState) => state.article
);

export const getArticleEntities = createSelector(
    getArticlesState,
    fromArticles.getArticleEntities
);

export const getArticles: (state: object) => Article[] = fromArticles.featureAdapter.getSelectors(getArticlesState).selectAll;

export const getArticle = createSelector(
    getArticlesState,
    fromArticles.getArticleEntity
);

export const getArticlePaged = createSelector(
    getArticlesState,
    fromArticles.getArticlePaged
);

export const getArticleLoading = createSelector(
    getArticlesState,
    fromArticles.getArticleLoading
);

export const getArticleLoaded = createSelector(
    getArticlesState,
    fromArticles.getArticleLoaded
);

export const getArticleSuccess = createSelector(
    getArticlesState,
    fromArticles.getArticleSuccess
);

export const getArticleError = createSelector(
    getArticlesState,
    fromArticles.getArticleError
);

