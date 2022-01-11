// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { all, put, takeLatest } from 'redux-saga/effects';
// import { authSagaActions } from 'sagas/auth-saga';
import { ActionUnion, createAction } from '../utils/redux';
import { AcceptanceSagaActionTypes } from '../actions/acceptance-saga-action';
import getCore from '../cvat-core-wrapper';

const core = getCore();

const acceptanceSagaActions = {
    getAbout: () => createAction(AcceptanceSagaActionTypes.ACCEPTANCE),
    AcceptanceSuccess: (server: any) => createAction(AcceptanceSagaActionTypes.ACCEPTANCE_SUCCESS, { server }),
    AcceptanceFailed: (error: any) => createAction(AcceptanceSagaActionTypes.ACCEPTANCE_FAILED, { error }),
};

export type AboutSagaActions = ActionUnion<typeof acceptanceSagaActions>;

function* getAboutAsync(): any {
    yield acceptanceSagaActions.getAbout();
    try {
        yield core.server.agreement();
        const users = yield core.users.get({ self: true });
        yield put(acceptanceSagaActions.AcceptanceSuccess(users));
    } catch (error) {
        yield put(acceptanceSagaActions.AcceptanceFailed(error));
    }
}

export function* acceptanceWatcher() {
    yield all([takeLatest(AcceptanceSagaActionTypes.ACCEPTANCE, getAboutAsync)]);
}
