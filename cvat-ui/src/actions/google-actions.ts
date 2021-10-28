// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { GOOGLE_OAUTH2 } from '../types/constants';
import { createAction } from '../utils/redux';
// import getCore from '../cvat-core-wrapper';

// const cvat = getCore();

export enum AuthActionTypes {
    AUTHORIZED_SUCCESS = 'AUTHORIZED_SUCCESS',
    AUTHORIZED_FAILED = 'AUTHORIZED_FAILED',
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
}
export const authActions = {
    authorizeSuccess: (user: any) => createAction(AuthActionTypes.AUTHORIZED_SUCCESS, { user }),
    authorizeFailed: (error: any) => createAction(AuthActionTypes.AUTHORIZED_FAILED, { error }),
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(AuthActionTypes.LOGIN_FAILED, { error }),
};
export const googleOAuth2 = (googleResponse) =>
    // console.log(googleResponse,"googleResponse");
    async (dispatch: any) => {
        if (typeof googleResponse === 'undefined') {
            googleResponse = []; // eslint-disable-line no-param-reassign
        }

        dispatch({ type: GOOGLE_OAUTH2, googleResponse });
        try {
            // console.log(username,password);
            // await cvat.server.login(username, password);
            // const users = await cvat.users.get({ self: true });
            // dispatch(authActions.loginSuccess(users[0]));
        } catch (error) {
            // dispatch(authActions.loginFailed(error));
        }
    };
