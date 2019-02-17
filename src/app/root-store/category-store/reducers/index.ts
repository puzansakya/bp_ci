import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCategory from './category.reducers';

export interface CategoryState {
    category: fromCategory.CategoryState
}

export const reducers: ActionReducerMap<CategoryState> = {
    category: fromCategory.reducer,
};

export const getCategoryState = createFeatureSelector<CategoryState>(
    'category'
);
