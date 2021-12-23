// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { all, fork } from 'redux-saga/effects';

import { authWatcher } from './auth-saga';
import { aboutWatcher} from './about-saga';
import { formatWatcher } from './format-saga';
import { exportWatcher } from './export-saga';
import { googleOAuthWatcher } from './google-saga';
import { UserListWatcher } from './userList-saga';
import { pluginWatcher } from './plugins-saga';
import { UserAgreementWatcher } from './userAgreements-saga';
// import { projectWatcher } from 'sagas/project-saga'
// import { tasksWatcher } from 'sagas/tasks-saga'

export default function* rootSaga() {
    yield all([
        fork(authWatcher),
        fork(aboutWatcher),
        fork (formatWatcher),
        fork(exportWatcher),
        fork(googleOAuthWatcher),
        fork(UserListWatcher),
        fork(pluginWatcher),
        fork(UserAgreementWatcher),
    // fork(projectWatcher)
    // fork(tasksWatcher),
    ]);
}
