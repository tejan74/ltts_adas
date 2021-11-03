// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
// import { GOOGLE_OAUTH2 } from '../types/constants';

import getCore from '../cvat-core-wrapper';
import { ActionUnion, createAction, ThunkAction } from 'utils/redux';
const cvat = getCore();

export enum GoogleActionTypes {
    GOOGLE_OAUTH2= 'GOOGLE_OAUTH2',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
}
export const googleActions = {
    googlelogin: () => createAction(GoogleActionTypes.GOOGLE_OAUTH2),
    loginSuccess: (user: any) => createAction(GoogleActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(GoogleActionTypes.LOGIN_FAILED, { error }),
};


export type GoogleAction = ActionUnion<typeof googleActions>;
export const googleOAuth2 = (access_token:string|null): ThunkAction => async (dispatch) => {
    dispatch(googleActions.googlelogin());

    try {
        await cvat.server.Googlelogin(access_token);
        const users = await cvat.users.get({ self: true });

        dispatch(googleActions.loginSuccess(users[0]));
    } catch (error) {
        dispatch(googleActions.loginFailed(error));
    }
};