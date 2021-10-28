// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { GOOGLE_OAUTH2 } from '../types/constants';

const initialState: any = [];

const googleReducer = (state = initialState, action: any) => {
    console.log(state, action.googleResponse);
    switch (action.type) {
        case GOOGLE_OAUTH2: {
            return action.googleResponse;
        }
        default:
            return state;
    }
};
export default googleReducer;
