// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { createAction, ThunkAction } from 'utils/redux';
import getCore from 'cvat-core-wrapper';

const cvat = getCore();

export enum UserActionTypes {
        LIST_FETCH_SUCCESS = 'USER_LIST_SUCCESS',

    }

// const userListSuccess: (user: any) => createAction(AuthActionTypes.AUTHORIZED_SUCCESS, { user });

export const userActions = {
        userListSuccess: (users: any) => createAction(UserActionTypes.LIST_FETCH_SUCCESS, { users }),

    };

// export type UserActions = ActionUnion<typeof userActions>;


export const getUserList = (): ThunkAction => async (dispatch) => {

        console.log('in there');
        const users = await cvat.users.get();
        dispatch(userActions.userListSuccess(users));
        console.log(users);


};
