// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

export const AcceptanceSagaActionTypes = {
    ACCEPTANCE: 'ACCEPTANCE',
    ACCEPTANCE_SUCCESS: 'ACCEPTANCE_SUCCESS',
    ACCEPTANCE_FAILED: 'ACCEPTANCE_FAILED',
};
export function getAcceptanceAsync() {
    return {
        type: AcceptanceSagaActionTypes.ACCEPTANCE,
    };
}
