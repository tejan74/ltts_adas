

import { all, put, takeLatest, call, delay } from 'redux-saga/effects';
import { AuthActionTypes } from 'actions/index';
import getCore from 'cvat-core-wrapper';

const cvat = getCore();
import { ActionUnion, createAction, ThunkAction } from 'utils/redux';

export const authActions = {
    authorizeSuccess: (user: any) => createAction(AuthActionTypes.AUTHORIZED_SUCCESS, { user }),
    authorizeFailed: (error: any) => createAction(AuthActionTypes.AUTHORIZED_FAILED, { error }),
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user }),
    loginFailed: (error: any) => createAction(AuthActionTypes.LOGIN_FAILED, { error }),
};

export type AuthActions = ActionUnion<typeof authActions>;

function* login(action: any): any {
    try {
        yield cvat.server.login(action.payload.username, action.payload.password);
        yield delay(1000);
        const users = yield cvat.users.get({ self: true });
        yield put(authActions.loginSuccess(users[0]));
    } catch (error) {
        yield put(authActions.loginFailed(error));
    }
}
function* loginWatcher() {
    yield takeLatest(AuthActionTypes.LOGIN, login);
}
export default function* rootSaga() {
    yield all([loginWatcher()]);
}
