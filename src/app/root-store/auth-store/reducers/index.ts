import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

// just typing for core reducer
export interface AuthState {
  auth: fromAuth.AuthState;
}

// type cast to Authstate
export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer
};

export const getAuthState = createFeatureSelector<AuthState>(
  'auth'
);
// export const getAuthState = createFeatureSelector<AuthState>('auth');
// export const getAuthState = (state: AuthState) => state.auth

// // selectors are here beacuse get auth state is not accessible for root
// export const getAuthLoading = createSelector(
//   getAuthState,
//   fromAuth.getLoading
// );

// export const getCurrentUser = createSelector(
//   getAuthState,
//   fromAuth.getUser
// );

// export const isAuthenticated = createSelector(
//   getAuthState,
//   fromAuth.getAuthenticated
// )

