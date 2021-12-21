// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { ActionUnion, createAction } from '../utils/redux';
import getCore from '../cvat-core-wrapper';
import { UserAgreement } from '../reducers/interfaces';
import { UserAgreementsSagaActionTypes } from '../actions/useragreements-saga-actions'
import { put,all,takeLatest } from 'redux-saga/effects';
const core = getCore();



const userAgreementsSagaActions = {
    getUserAgreements: () => createAction(UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS),
    getUserAgreementsSuccess: (userAgreements: UserAgreement[]) =>
        createAction(UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS_SUCCESS, userAgreements),
    getUserAgreementsFailed: (error: any) =>
        createAction(UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS_FAILED, { error }),
};

export type UserAgreementsSagaActions = ActionUnion<typeof userAgreementsSagaActions>;

    function* getUserAgreementsAsync ():any {
    // dispatch(userAgreementsActions.getUserAgreements());
    try {
        const userAgreements = yield core.server.userAgreements();
        yield put(userAgreementsSagaActions.getUserAgreementsSuccess(userAgreements));
    } catch (error) {
        yield put(userAgreementsSagaActions.getUserAgreementsFailed(error));
    }
};

export function* UserAgreementWatcher() {
    yield all ([
        takeLatest(UserAgreementsSagaActionTypes.GET_USER_AGREEMENTS, getUserAgreementsAsync),

    ])
}