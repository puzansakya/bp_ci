import * as fromCategory from '../actions';
import { Category } from '../../../core/models/category.model';
import { paged } from '../../../core/models/paged.model';

export interface CategoryState {
    entities: { [id: number]: Category };
    paged: paged
    loading: boolean;
    loaded: boolean;
}

export const initialState: CategoryState = {
    entities: {},
    paged: {
        page: 0,
        pageSize: 0,
        rowCount: 0,
        pageCount: 0
    },
    loading: false,
    loaded: false,
};

export function reducer(
    state = initialState,
    action: fromCategory.CategoryAction
): CategoryState {
    switch (action.type) {
        case fromCategory.LOAD_CATEGORY: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromCategory.LOAD_CATEGORY_SUCCESS: {
            const category = action.payload;
            const entities = category.data.reduce(
                (entities: { [id: number]: Category }, category: Category) => {
                    return {
                        ...entities,
                        [category.id]: category,
                    };
                },
                {
                    ...state.entities,
                }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }

        case fromCategory.LOAD_CATEGORY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
        case fromCategory.CREATE_CATEGORY_SUCCESS: {
            const category = action.payload;
            const entities = {
                ...state.entities,
                [category.id]: category,
            };

            return {
                ...state,
                entities,
            };
        }
        case fromCategory.UPDATE_CATEGORY_SUCCESS: {
            const category = action.payload;

            // const entities = Object.assign({}, state.entities, {
            //     [category.id]: category
            // });
            const entities = {
                ...state.entities,
                [category.id]: category
            };

            return {
                ...state,
                entities
            }
        }
    }

    return state;
}

export const getCategoryEntities = (state: CategoryState) => state.entities;
export const getCategoryPaged = (state: CategoryState) => state.paged;
export const getCategoryLoading = (state: CategoryState) => state.loading;
export const getCategoryLoaded = (state: CategoryState) => state.loaded;
