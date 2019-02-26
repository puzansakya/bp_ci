import { AuthActionTypes, AuthAction } from '../actions/auth.actions';
import { User } from '../../../core/models/user.model';

/**
 * The state.
 * @interface State
 */
export interface AuthState {

    // boolean if user is authenticated
    authenticated: boolean;

    // error message
    error?: string;

    // true when loading
    loading: boolean;

    // the authenticated user
    user?: User;
}

/**
 * The initial state.
 */
export const initialState: AuthState = {
    authenticated: false,
    loading: false,
    user: null,
    error: null
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function reducer(state: AuthState = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATED_SUCCESS: {
            return {
                ...state,
                authenticated: action.payload.authenticated,
                user: action.payload.user
            }
        }
        case AuthActionTypes.AUTHENTICATED_FAILURE: {
            return {
                ...state,
                authenticated: false,
                user: null,
                error: action.payload
            }
        }
        case AuthActionTypes.LOGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                authenticated: true,
                loading: false,
                user: action.payload
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                error: 'Incorrect email and/or password.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const isAuthenticated = (state: AuthState) => state.authenticated;
export const getLoading = (state: AuthState) => state.loading;
export const getError = (state: AuthState) => state.error;
export const getUser = (state: AuthState) => state.user;


