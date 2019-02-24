import { Action } from '@ngrx/store';
import { User } from '../../../core/models/user.model';

export enum AuthActionTypes {
    AUTHENTICATED = '[Auth] AUTHENTICATED',
    AUTHENTICATED_SUCCESS = '[Auth] AUTHENTICATED_SUCCESS',
    AUTHENTICATED_FAILURE = '[Auth] AUTHENTICATED_FAILURE',

    LOGIN = '[Auth] LOGIN',
    LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS',
    LOGIN_FAILURE = '[Auth] LOGIN_FAILURE',

    REDIRECT = '[Auth] REDIRECT',

    LOGOUT = '[Auth] LOGOUT',
    LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS',
    LOGOUT_FAILURE = '[Auth] LOGOUT_FAILURE',
}

/**
 * Checks if user is authenticated.
 * @class Authenticated
 * @implements {Action}
 */
export class Authenticated implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED;
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccess
 * @implements {Action}
 */
export class AuthenticatedSuccess implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED_SUCCESS;
    // constructor(public payload: boolean) { }
    constructor(public payload: { authenticated: boolean, user: User }) { }
}

/**
 * Authenticated check error.
 * @class AuthenticatedFailure
 * @implements {Action}
 */
export class AuthenticatedFailure implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED_FAILURE;
    constructor(public payload: any) { }
}

/**
 * Log in.
 * @class Login
 * @implements {Action}
 */
export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

/**
 * Log in success.
 * @class LoginSuccess
 * @implements {Action}
 */
export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

/**
 * Log in error.
 * @class LoginFailure
 * @implements {Action}
 */
export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: User) { }
}

/**
 * Redirect to root if logged in.
 * @class Redirect
 * @implements {Action}
 */
export class Redirect implements Action {
    readonly type = AuthActionTypes.REDIRECT;
}


/**
 * Log out.
 * @class Logout
 * @implements {Action}
 */
export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

/**
 * Log out success.
 * @class LogoutSuccess
 * @implements {Action}
 */
export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

/**
 * Log out failure.
 * @class LogOutFailure
 * @implements {Action}
 */
export class LogOutFailure implements Action {
    readonly type = AuthActionTypes.LOGOUT_FAILURE;
    constructor(public payload?: any) { }
}


export type AuthAction =
    | Authenticated | AuthenticatedSuccess | AuthenticatedFailure
    | Login | LoginSuccess | LoginFailure
    | Logout | LoginSuccess | LogOutFailure;
