import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
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
    debounceTime
} from 'rxjs/operators';

import * as categoryActions from '../actions/category.actions';
import * as fromServices from '../../../core/services';

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private categoryService: fromServices.CategoryService
    ) { }

    @Effect()
    loadCategories$ = ({ debounce = 3000, scheduler = asyncScheduler } = {}): Observable<Action> => this.actions$.pipe(
        debounceTime(debounce, scheduler),
        ofType(categoryActions.LOAD_CATEGORY),
        switchMap(() => {
            console.log('LoadCategory');
            return this.categoryService
                .getCategory()
                .pipe(
                    map(categories => new categoryActions.LoadCategorySuccess(categories)),
                    catchError(error => of(new categoryActions.LoadCategoryFail(error)))
                );
        })
    );

    @Effect()
    createCategory$ = this.actions$.pipe(
        ofType(categoryActions.CREATE_CATEGORY),
        map((action: categoryActions.CreateCategory) => action.payload),
        switchMap(category => {
            return this.categoryService
                .createCategory(category)
                .pipe(
                    map(category => new categoryActions.CreateCategorySuccess(category)),
                    catchError(error => of(new categoryActions.CreateCategoryFail(error)))
                );
        })
    );

    @Effect()
    updateCategory$ = this.actions$.pipe(
        ofType(categoryActions.UPDATE_CATEGORY),
        map((action: categoryActions.updatecategory) => action.payload),
        switchMap(category => {
            return this.categoryService
                .updateCategory(category)
                .pipe(
                    map(() => new categoryActions.updatecategorySuccess(category)),
                    catchError(error => of(new categoryActions.updatecategoryFail(error)))
                );
        })
    );
}
