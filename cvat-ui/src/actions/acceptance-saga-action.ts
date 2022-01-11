// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { ActionUnion, createAction, ThunkAction } from 'utils/redux';
import getCore from 'cvat-core-wrapper';
import { authSagaActions } from 'sagas/auth-saga';

const cvat = getCore();
export const AcceptanceSagaActionTypes = {
    ACCEPTANCE: 'ACCEPTANCE',
    ACCEPTANCE_SUCCESS: 'ACCEPTANCE_SUCCESS',
    ACCEPTANCE_FAILED: 'ACCEPTANCE_FAILED',
};
const aboutActions = {
    getAbout: () => createAction(AcceptanceSagaActionTypes.ACCEPTANCE),
    getAboutSuccess: (server: any) => createAction(AcceptanceSagaActionTypes.ACCEPTANCE_SUCCESS, { server }),
    getAboutFailed: (error: any) => createAction(AcceptanceSagaActionTypes.ACCEPTANCE_FAILED, { error }),
};

export type AboutActions = ActionUnion<typeof aboutActions>;
export const getAcceptanceAsync = (): ThunkAction => async (dispatch): Promise<void> => {
    dispatch(aboutActions.getAbout());
    // const about = await core.server.agreement();
    try {
        await cvat.server.agreement();
        const users = await cvat.users.get({ self: true });
        dispatch(authSagaActions.loginSuccess(users));
    } catch (error) {
        dispatch(aboutActions.getAboutFailed(error));
    }
};
