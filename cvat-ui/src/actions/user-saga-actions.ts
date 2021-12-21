// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum UserSagaActionTypes {
    GET_UERS='GET_UERS',
    LIST_FETCH_SUCCESS = 'USER_LIST_SUCCESS',
    LIST_FETCH_FAILED = 'USER_LIST_FAILED',

}

export function getUserList (){
    return {
        type:UserSagaActionTypes.GET_UERS,
    }
}