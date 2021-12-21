
// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum AboutSagaActionTypes {
    GET_ABOUT = 'GET_ABOUT',
    GET_ABOUT_SUCCESS = 'GET_ABOUT_SUCCESS',
    GET_ABOUT_FAILED = 'GET_ABOUT_FAILED',
}



export function getAboutAsync() {
    return {
          type: AboutSagaActionTypes.GET_ABOUT,
      };
  }