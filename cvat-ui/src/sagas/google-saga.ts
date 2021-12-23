// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { GoogleSagaActionTypes } from '../actions/google-saga-actions';
import getCore from '../cvat-core-wrapper';
import { ActionUnion, createAction } from '../utils/redux';
const cvat = getCore();
import { put,all, takeLatest } from 'redux-saga/effects';

export const googleSagaActions = {
    googlelogin: () => createAction(GoogleSagaActionTypes.GOOGLE_OAUTH2),
    loginSuccess: (user: any) => createAction(GoogleSagaActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(GoogleSagaActionTypes.LOGIN_FAILED, { error }),
};


export type GoogleSagaAction = ActionUnion<typeof googleSagaActions>;

    function* googleOAuth2 (action:any) :any{
    try {
        yield cvat.server.Googlelogin(action.payload);
        const users = yield cvat.users.get({ self: true });

        yield put(googleSagaActions.loginSuccess(users[0]));
    } catch (error) {
        yield put(googleSagaActions.loginFailed(error));
    }
};


export function* googleOAuthWatcher() {
    yield all ([
        takeLatest(GoogleSagaActionTypes.GOOGLE_OAUTH2, googleOAuth2),

    ])
}
