// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { AboutSagaActionTypes } from '../actions/about-saga-actions'
import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionUnion, createAction } from '../utils/redux';
import getCore from '../cvat-core-wrapper';
const core = getCore();

const aboutSagaActions = {
    getAbout: () => createAction(AboutSagaActionTypes.GET_ABOUT),
    getAboutSuccess: (server: any) => createAction(AboutSagaActionTypes.GET_ABOUT_SUCCESS, { server }),
    getAboutFailed: (error: any) => createAction(AboutSagaActionTypes.GET_ABOUT_FAILED, { error }),
};

export type AboutSagaActions = ActionUnion<typeof aboutSagaActions>;

   function* getAboutAsync ():any {
    try {
        const about = yield core.server.about();
        yield put (aboutSagaActions.getAboutSuccess(about));
    } catch (error) {
        yield put(aboutSagaActions.getAboutFailed(error));
    }
};

export function* aboutWatcher() {
    yield all ([
        takeLatest(AboutSagaActionTypes.GET_ABOUT, getAboutAsync),

    ])
}