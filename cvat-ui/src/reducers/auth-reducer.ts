// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { BoundariesActions, BoundariesActionTypes } from 'actions/boundaries-actions';
// import { AuthActions, AuthSagaActionTypes } from 'actions/auth-actions';
import { AuthSagaActionTypes } from 'actions/auth-saga-actions';
import { AuthSagaActions } from 'sagas/auth-saga';
import { AuthState } from './interfaces';

const defaultState: AuthState = {
    initialized: false,
    fetching: false,
    user: null,
    authActionsFetching: false,
    authActionsInitialized: false,
    allowChangePassword: false,
    showChangePasswordDialog: false,
    allowResetPassword: false,
};

export default function (state = defaultState, action: AuthSagaActions | BoundariesActions): AuthState {
    switch (action.type) {
        case AuthSagaActionTypes.AUTHORIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
                user: action?.payload?.user,
            };
        case AuthSagaActionTypes.AUTHORIZED_FAILED:
            return {
                ...state,
                initialized: true,
            };
        case AuthSagaActionTypes.LOGIN:
            return {
                ...state,
                fetching: true,
            };
        case AuthSagaActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                user: action?.payload?.user,
            };
        case AuthSagaActionTypes.LOGIN_FAILED:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.LOGOUT:
            return {
                ...state,
                fetching: true,
            };
        case AuthSagaActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                fetching: false,
                user: null,
            };
        case AuthSagaActionTypes.REGISTER:
            return {
                ...state,
                fetching: true,
                user: null,
            };
        case AuthSagaActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                fetching: false,
                user: action.payload.user,
            };
        case AuthSagaActionTypes.REGISTER_FAILED:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.CHANGE_PASSWORD:
            return {
                ...state,
                fetching: true,
            };
        case AuthSagaActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                fetching: false,
                showChangePasswordDialog: false,
            };
        case AuthSagaActionTypes.CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.SWITCH_CHANGE_PASSWORD_DIALOG:
            return {
                ...state,
                showChangePasswordDialog:
                    typeof action.payload.showChangePasswordDialog === 'undefined' ?
                        !state.showChangePasswordDialog :
                        action.payload.showChangePasswordDialog,
            };
        case AuthSagaActionTypes.REQUEST_PASSWORD_RESET:
            return {
                ...state,
                fetching: true,
            };
        case AuthSagaActionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.REQUEST_PASSWORD_RESET_FAILED:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.RESET_PASSWORD:
            return {
                ...state,
                fetching: true,
            };
        case AuthSagaActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.RESET_PASSWORD_FAILED:
            return {
                ...state,
                fetching: false,
            };
        case AuthSagaActionTypes.LOAD_AUTH_ACTIONS:
            return {
                ...state,
                authActionsFetching: true,
            };
        case AuthSagaActionTypes.LOAD_AUTH_ACTIONS_SUCCESS:
            return {
                ...state,
                authActionsFetching: false,
                authActionsInitialized: true,
                allowChangePassword: action.payload.allowChangePassword,
                allowResetPassword: action.payload.allowResetPassword,
            };
        case AuthSagaActionTypes.LOAD_AUTH_ACTIONS_FAILED:
            return {
                ...state,
                authActionsFetching: false,
                authActionsInitialized: true,
                allowChangePassword: false,
                allowResetPassword: false,
            };
        case BoundariesActionTypes.RESET_AFTER_ERROR: {
            return { ...defaultState };
        }
        default:
            return state;
    }
}
