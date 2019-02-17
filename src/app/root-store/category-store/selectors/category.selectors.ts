import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCategory from '../reducers/category.reducers';

export const getCategoriesState = createSelector(
    fromFeature.getCategoryState,
    (state: fromFeature.CategoryState) => state.category
);

export const getCategoryEntities = createSelector(
    getCategoriesState,
    fromCategory.getCategoryEntities
);

export const getCategories = createSelector(
    getCategoryEntities,
    entities => {
        return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
    }
);

export const getCategoriesPaged = createSelector(
    getCategoriesState,
    fromCategory.getCategoryPaged
);

export const getCategoriesLoaded = createSelector(
    getCategoriesState,
    fromCategory.getCategoryLoaded
);

export const getCategoriesLoading = createSelector(
    getCategoriesState,
    fromCategory.getCategoryLoading
);

