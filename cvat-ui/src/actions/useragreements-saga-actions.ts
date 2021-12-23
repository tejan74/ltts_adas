// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum UserAgreementsSagaActionTypes {
    GET_USER_AGREEMENTS = 'GET_USER_AGREEMENTS',
    GET_USER_AGREEMENTS_SUCCESS = 'GET_USER_AGREEMENTS_SUCCESS',
    GET_USER_AGREEMENTS_FAILED = 'GET_USER_AGREEMENTS_FAILED',
}


export function getUserAgreementsAsync (){
    return {
        type:UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS,
    }
}