// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
 export enum ExportSagaActionTypes {
    OPEN_EXPORT_MODAL = 'OPEN_EXPORT_MODAL',
    CLOSE_EXPORT_MODAL = 'CLOSE_EXPORT_MODAL',
    EXPORT_DATASET = 'EXPORT_DATASET',
    EXPORT_DATASET_SUCCESS = 'EXPORT_DATASET_SUCCESS',
    EXPORT_DATASET_FAILED = 'EXPORT_DATASET_FAILED',
}


export function exportDatasetAsync (
    instance: any,
    format: string,
    name: string,
    saveImages: boolean){
        return {
            type:ExportSagaActionTypes.EXPORT_DATASET,
            payload:{instance,format,name,saveImages}
        }
    }