// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { ActionUnion, createAction } from '../utils/redux';
import getCore from '../cvat-core-wrapper';
import { FormatsSagaActionTypes } from '../actions/formats-saga-actions'
import { put,all, takeLatest } from 'redux-saga/effects';

const cvat = getCore();

const formatsSagaActions = {
    getFormats: () => createAction(FormatsSagaActionTypes.GET_FORMATS),
    getFormatsSuccess: (annotationFormats: any) =>
        createAction(FormatsSagaActionTypes.GET_FORMATS_SUCCESS, {
            annotationFormats,
        }),
    getFormatsFailed: (error: any) => createAction(FormatsSagaActionTypes.GET_FORMATS_FAILED, { error }),
};

export type FormatsSagaActions = ActionUnion<typeof formatsSagaActions>;


    function* getFormatsAsync():any {
        let annotationFormats = null;
        try {
            annotationFormats = yield cvat.server.formats();
            yield put (formatsSagaActions.getFormatsSuccess(annotationFormats));
        } catch (error) {
            yield put(formatsSagaActions.getFormatsFailed(error));
        }
}


export function* formatWatcher() {
    yield all ([
        takeLatest(FormatsSagaActionTypes.GET_FORMATS, getFormatsAsync),

    ])
}