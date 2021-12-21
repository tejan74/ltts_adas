// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum PluginsSagaActionTypes {
    GET_PLUGINS = 'GET_PLUGINS',
    GET_PLUGINS_SUCCESS = 'GET_PLUGINS_SUCCESS',
    GET_PLUGINS_FAILED = 'GET_PLUGINS_FAILED',
}

export function getPluginsAsync (){
    return {
        type:PluginsSagaActionTypes.GET_PLUGINS,
    }
}