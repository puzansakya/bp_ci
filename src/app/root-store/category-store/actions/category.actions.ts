import { Action } from '@ngrx/store';
import { Category } from '../../../core/models/category.model';
import { ResponseWrapper } from '../../../core/models/response.model';

// load single article
export const LOAD_CATEGORY = '[Categories] Load Categories';
export const LOAD_CATEGORY_FAIL = '[Categories] Load Categories Fail';
export const LOAD_CATEGORY_SUCCESS = '[Categories] Load Categories Success';

export class LoadCategory implements Action {
  readonly type = LOAD_CATEGORY;
}

export class LoadCategoryFail implements Action {
  readonly type = LOAD_CATEGORY_FAIL;
  constructor(public payload: any) { }
}

export class LoadCategorySuccess implements Action {
  readonly type = LOAD_CATEGORY_SUCCESS;
  constructor(public payload: ResponseWrapper<Category>) { }
}

// create category
export const CREATE_CATEGORY = '[Categories] Create Category';
export const CREATE_CATEGORY_FAIL = '[Categories] Create Category Fail';
export const CREATE_CATEGORY_SUCCESS = '[Categories] Create Category Success';

export class CreateCategory implements Action {
  readonly type = CREATE_CATEGORY;
  constructor(public payload: Category) { }
}

export class CreateCategorySuccess implements Action {
  readonly type = CREATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) { }
}

export class CreateCategoryFail implements Action {
  readonly type = CREATE_CATEGORY_FAIL;
  constructor(public payload: any) { }
}


// update pizza
export const UPDATE_CATEGORY = '[Categories] Update Category';
export const UPDATE_CATEGORY_FAIL = '[Categories] Update Category Fail';
export const UPDATE_CATEGORY_SUCCESS = '[Categories] Update Category Success';

export class updatecategory implements Action {
  readonly type = UPDATE_CATEGORY;
  constructor(public payload: Category) { }
}

export class updatecategorySuccess implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) { }
}

export class updatecategoryFail implements Action {
  readonly type = UPDATE_CATEGORY_FAIL;
  constructor(public payload: any) { }
}


// action types
export type CategoryAction =
  | LoadCategory | LoadCategoryFail | LoadCategorySuccess
  | CreateCategory | CreateCategorySuccess | CreateCategoryFail
  | updatecategory | updatecategorySuccess | updatecategoryFail;
