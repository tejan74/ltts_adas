// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { ActionUnion, createAction } from '../utils/redux';
import { PluginsList } from '../reducers/interfaces';
import getCore from '../cvat-core-wrapper';
import { put,all, takeLatest } from 'redux-saga/effects';
import { PluginsSagaActionTypes } from '../actions/plugins-saga-actions';

const core = getCore();

const pluginSagaActions = {
    checkPlugins: () => createAction(PluginsSagaActionTypes.GET_PLUGINS),
    checkPluginsSuccess: (list: PluginsList) => createAction(PluginsSagaActionTypes.GET_PLUGINS_SUCCESS, { list }),
    checkPluginsFailed: (error: any) => createAction(PluginsSagaActionTypes.GET_PLUGINS_FAILED, { error }),
};

export type PluginSagaActions = ActionUnion<typeof pluginSagaActions>;

    function* getPluginsAsync(){
    // dispatch(pluginActions.checkPlugins());
    try {
        const list: PluginsList = yield core.server.installedApps();
        yield put(pluginSagaActions.checkPluginsSuccess(list));
    } catch (error) {
        yield put(pluginSagaActions.checkPluginsFailed(error));
    }
};

export function* pluginWatcher() {
    yield all ([
        takeLatest(PluginsSagaActionTypes.GET_PLUGINS, getPluginsAsync),

    ])
}