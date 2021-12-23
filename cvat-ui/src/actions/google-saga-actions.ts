// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum GoogleSagaActionTypes {
    GOOGLE_OAUTH2= 'GOOGLE_OAUTH2',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
}


export function googleOAuth2 (accesstoken:string|null){
        return {
            type:GoogleSagaActionTypes.GOOGLE_OAUTH2,
            payload:accesstoken
        }
    }