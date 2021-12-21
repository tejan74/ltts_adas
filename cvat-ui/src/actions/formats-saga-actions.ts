// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum FormatsSagaActionTypes {
    GET_FORMATS = 'GET_FORMATS',
    GET_FORMATS_SUCCESS = 'GET_FORMATS_SUCCESS',
    GET_FORMATS_FAILED = 'GET_FORMATS_FAILED',
}

export function getFormatsAsync (){
        return {
            type:FormatsSagaActionTypes.GET_FORMATS,
        }
    }