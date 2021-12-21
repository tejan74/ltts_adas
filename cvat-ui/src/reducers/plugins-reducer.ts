// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

// import { PluginsSagaActionTypes, PluginActions } from 'actions/plugins-actions';
import { PluginsSagaActionTypes } from 'actions/plugins-saga-actions';
import { PluginSagaActions } from 'sagas/plugins-saga';
import { registerGitPlugin } from 'utils/git-utils';
import { PluginsState } from './interfaces';

const defaultState: PluginsState = {
    fetching: false,
    initialized: false,
    list: {
        GIT_INTEGRATION: false,
        ANALYTICS: false,
        MODELS: false,
        PREDICT: false,
    },
};

export default function (state: PluginsState = defaultState, action: PluginSagaActions): PluginsState {
    switch (action.type) {
        case PluginsSagaActionTypes.GET_PLUGINS: {
            return {
                ...state,
                initialized: false,
                fetching: true,
            };
        }
        case PluginsSagaActionTypes.GET_PLUGINS_SUCCESS: {
            const { list } = action.payload;

            if (!state.list.GIT_INTEGRATION && list.GIT_INTEGRATION) {
                registerGitPlugin();
            }

            return {
                ...state,
                initialized: true,
                fetching: false,
                list,
            };
        }
        case PluginsSagaActionTypes.GET_PLUGINS_FAILED: {
            return {
                ...state,
                initialized: true,
                fetching: false,
            };
        }
        default:
            return state;
    }
}
