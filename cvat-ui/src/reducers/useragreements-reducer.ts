// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { BoundariesActions, BoundariesActionTypes } from 'actions/boundaries-actions';
// import { UserAgreementsActions, UserAgreementsSagaActionTypes } from 'actions/useragreements-actions';
import { UserAgreementsSagaActionTypes } from 'actions/useragreements-saga-actions';
import { UserAgreementsSagaActions } from '../sagas/userAgreements-saga';
// import { AuthActions, AuthActionTypes } from 'actions/auth-actions';
import { AuthSagaActions } from 'sagas/auth-saga';
import { AuthSagaActionTypes } from 'actions/auth-saga-actions';
import { UserAgreementsState } from './interfaces';

const defaultState: UserAgreementsState = {
    list: [],
    fetching: false,
    initialized: false,
};

export default function (
    state: UserAgreementsState = defaultState,
    action: UserAgreementsSagaActions | AuthSagaActions | BoundariesActions,
): UserAgreementsState {
    switch (action.type) {
        case UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS: {
            return {
                ...state,
                fetching: true,
                initialized: false,
            };
        }
        case UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                initialized: true,
                list: action.payload,
            };
        case UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS_FAILED:
            return {
                ...state,
                fetching: false,
                initialized: true,
            };
        case AuthSagaActionTypes.LOGOUT_SUCCESS:
        case BoundariesActionTypes.RESET_AFTER_ERROR: {
            return {
                ...defaultState,
            };
        }
        default:
            return state;
    }
}
