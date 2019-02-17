import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducers';

export const getAuth = createSelector(
    fromFeature.getAuthState,
    (state: fromFeature.AuthState) => state.auth
);

export const getAuthUser = createSelector(
    getAuth,
    fromAuth.getUser
);

export const isAuth = createSelector(
    getAuth,
    fromAuth.isAuthenticated
);

export const getAuthLoading = createSelector(
    getAuth,
    fromAuth.getLoading
);
