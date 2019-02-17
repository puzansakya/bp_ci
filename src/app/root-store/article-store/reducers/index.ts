import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromArticle from './article.reducer';

export interface ArticleState {
    article: fromArticle.ArticleState
}

export const reducers: ActionReducerMap<ArticleState> = {
    article: fromArticle.reducer,
};

export const getArticleState = createFeatureSelector<ArticleState>(
    'article'
);
