// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { BoundariesActions, BoundariesActionTypes } from 'actions/boundaries-actions';
// import { FormatsSagaActionTypes, FormatsActions } from 'actions/formats-actions';
import { FormatsSagaActionTypes } from 'actions/formats-saga-actions';
import { FormatsSagaActions } from 'sagas/format-saga';
// import { AuthActionTypes, AuthActions } from 'actions/auth-actions';
import { AuthSagaActions } from 'sagas/auth-saga';
import { AuthSagaActionTypes } from 'actions/auth-saga-actions';

import { FormatsState } from './interfaces';

const defaultState: FormatsState = {
    annotationFormats: null,
    initialized: false,
    fetching: false,
};

export default (
    state: FormatsState = defaultState,
    action: FormatsSagaActions | AuthSagaActions | BoundariesActions,
): FormatsState => {
    switch (action.type) {
        case FormatsSagaActionTypes.GET_FORMATS: {
            return {
                ...state,
                fetching: true,
                initialized: false,
            };
        }
        case FormatsSagaActionTypes.GET_FORMATS_SUCCESS:
            return {
                ...state,
                initialized: true,
                fetching: false,
                annotationFormats: action.payload.annotationFormats,
            };
        case FormatsSagaActionTypes.GET_FORMATS_FAILED:
            return {
                ...state,
                initialized: true,
                fetching: false,
            };
        case BoundariesActionTypes.RESET_AFTER_ERROR:
        case AuthSagaActionTypes.LOGOUT_SUCCESS: {
            return { ...defaultState };
        }
        default:
            return state;
    }
};
