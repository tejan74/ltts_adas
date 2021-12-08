import { all, fork } from "redux-saga/effects";

import { authWatcher } from '../sagas/auth-saga';
import { projectWatcher } from 'sagas/project-saga'
// import { tasksWatcher } from 'sagas/tasks-saga'

export function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(projectWatcher),
    // fork(tasksWatcher),
    ]);
}
