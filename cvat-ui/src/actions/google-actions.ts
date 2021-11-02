// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { GOOGLE_OAUTH2 } from '../types/constants';
import { createAction } from '../utils/redux';
import getCore from '../cvat-core-wrapper';
import axios from 'axios';
const cvat = getCore();

export enum AuthActionTypes {

    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
}
export const authActions = {
    authorizeSuccess: (user: any) => createAction(AuthActionTypes.AUTHORIZED_SUCCESS, { user }),
    authorizeFailed: (error: any) => createAction(AuthActionTypes.AUTHORIZED_FAILED, { error }),
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(AuthActionTypes.LOGIN_FAILED, { error }),
};

    export const googleOAuth2 =(googleResponse) =>{
    const payload = {access_token: googleResponse['accessToken']}
//    const users =  axios.post("http://localhost:7000/google/", payload).then((response)=>{console.log(response)});
console.log(googleResponse
    ,"googleResponse");
        async (dispatch: any) => {
         dispatch(authActions.login());
        alert("ll");
        try {
            alert("ll");
            await cvat.server.Googlelogin(payload);



        } catch (error) {
            console.log(error,"error");
            dispatch(authActions.loginFailed(error));
        }
    }
}
// const successGoogleLogin = (response) => {

//     console.log(response);

//  const payload = {

//      access_token: response.accessToken

//  }

//  axios.post("http://localhost:7000/google/", payload).then((response)=>{console.log(response)});

// }