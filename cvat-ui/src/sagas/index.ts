// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import {
    all, put, takeLatest, delay,
} from 'redux-saga/effects';
import { AuthActionTypes } from 'actions/index';
import getCore from 'cvat-core-wrapper';
import { ActionUnion, createAction } from 'utils/redux';

const cvat = getCore();

export const authActions = {
    authorizeSuccess: (user: any) => createAction(AuthActionTypes.AUTHORIZED_SUCCESS, { user }),
    authorizeFailed: (error: any) => createAction(AuthActionTypes.AUTHORIZED_FAILED, { error }),
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(AuthActionTypes.LOGIN_FAILED, { error }),
    logout: () => createAction(AuthActionTypes.LOGOUT),
    logoutSuccess: () => createAction(AuthActionTypes.LOGOUT_SUCCESS),
    logoutFailed: (error: any) => createAction(AuthActionTypes.LOGOUT_FAILED, { error }),
};

export type AuthActions = ActionUnion<typeof authActions>;

function* login(action: any): any {
    try {
        yield cvat.server.login(action.payload.username, action.payload.password);
        yield delay(1000);
        const users = yield cvat.users.get({ self: true });
        yield put(authActions.loginSuccess(users[0]));
    } catch (error) {
        yield put(authActions.loginFailed(error));
    }
}
function* loginWatcher() {
    yield takeLatest(AuthActionTypes.LOGIN, login);
}
function* logout():any {
    try {
        yield cvat.server.logout();

        yield put(authActions.logoutSuccess());
    } catch (error) {
        yield put(authActions.logoutFailed(error));
    }
}
function* logoutWatcher() {
    yield takeLatest(AuthActionTypes.LOGOUT, logout);
}
export default function* rootSaga() {
    yield all([loginWatcher(), logoutWatcher()]);
}
