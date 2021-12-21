// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT


import getCore from '../cvat-core-wrapper';
import { ActionUnion, createAction } from '../utils/redux';
const cvat = getCore();
// import { Dispatch, ActionCreator } from 'redux';
import { UserSagaActionTypes } from 'actions/user-saga-actions';
import { all, put, takeLatest } from 'redux-saga/effects';


export const userSagaActions = {
    getUser: () => createAction(UserSagaActionTypes.GET_UERS),
    userListSuccess: (users: any[], count: number) => (
    createAction(UserSagaActionTypes.LIST_FETCH_SUCCESS, { users, count })
        ),
    userListFailed: (error: any) => createAction(UserSagaActionTypes.LIST_FETCH_FAILED, { error }),
    };


export type UserSagaActions = ActionUnion<typeof userSagaActions>;

    function* getUserList ():any{
    // return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        // dispatch(userActions.getUser());

        let result = null;
        try {
            result = yield cvat.users.get();
            yield put(userSagaActions.userListSuccess(result,result.length));
        } catch (error) {
            yield put(userSagaActions.userListFailed(error));
            return;
        }
    // };
}


export function* UserListWatcher() {
    yield all ([
        takeLatest(UserSagaActionTypes.GET_UERS, getUserList),

    ])
}