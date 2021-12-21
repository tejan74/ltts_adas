// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { ActionUnion, createAction } from '../utils/redux';
import { ExportSagaActionTypes } from '../actions/export-saga-actions';
import { all, put, takeLatest } from 'redux-saga/effects';

export const exportSagaActions = {
    openExportModal: (instance: any) => createAction(ExportSagaActionTypes.OPEN_EXPORT_MODAL, { instance }),
    closeExportModal: () => createAction(ExportSagaActionTypes.CLOSE_EXPORT_MODAL),
    exportDataset: (instance: any, format: string) =>
        createAction(ExportSagaActionTypes.EXPORT_DATASET, { instance, format }),
    exportDatasetSuccess: (instance: any, format: string) =>
        createAction(ExportSagaActionTypes.EXPORT_DATASET_SUCCESS, { instance, format }),
    exportDatasetFailed: (instance: any, format: string, error: any) =>
        createAction(ExportSagaActionTypes.EXPORT_DATASET_FAILED, {
            instance,
            format,
            error,
        }),
};

    function* exportDatasetAsync (action:any):any {
        // yield(exportSagaActions.exportDataset(action.payload.instance, action.payload.format));
    try {
        const url = yield (action.payload.instance.annotations.exportDataset(action.payload.format, action.payload.saveImages, action.payload.name));
        const downloadAnchor = window.document.getElementById('downloadAnchor') as HTMLAnchorElement;
        downloadAnchor.href = url;
        downloadAnchor.click();
        yield put(exportSagaActions.exportDatasetSuccess(action.payload.instance, action.payload.format));
    } catch (error) {
        yield put(exportSagaActions.exportDatasetFailed(action.payload.instance, action.payload.format, error));
    }
};

export type ExportSagaActions = ActionUnion<typeof exportSagaActions>;

export function* exportWatcher() {
    yield all ([
        takeLatest(ExportSagaActionTypes.EXPORT_DATASET,exportDatasetAsync ),
    ])
}