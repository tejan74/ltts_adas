// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { BoundariesActions, BoundariesActionTypes } from 'actions/boundaries-actions';
import { GoogleAction, GoogleActionTypes } from 'actions/google-actions';
import { GoogleAuthState } from './interfaces';

const defaultState: GoogleAuthState = {
    initialized: false,
    fetching: false,
    user: null,
    access_token:null,

};

export default function (state = defaultState, action: GoogleAction | BoundariesActions): GoogleAuthState {
    switch (action.type) {

        case GoogleActionTypes.GOOGLE_OAUTH2:
            return {
                ...state,
                fetching: true,
            };
            case BoundariesActionTypes.RESET_AFTER_ERROR: {
                return { ...defaultState };
            }
        default:
            return state;
    }
}
