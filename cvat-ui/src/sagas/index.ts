// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { all, fork } from 'redux-saga/effects';

import { authWatcher } from './auth-saga';
// import { projectWatcher } from 'sagas/project-saga'
// import { tasksWatcher } from 'sagas/tasks-saga'

export default function* rootSaga() {
    yield all([
        fork(authWatcher),
    // fork(projectWatcher),
    // fork(tasksWatcher),
    ]);
}
