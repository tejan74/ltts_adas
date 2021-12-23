//import { AnyAction } from 'redux';
//import { omit } from 'lodash';
import { BoundariesActionTypes } from '../actions/boundaries-actions';
// import { TasksActionTypes } from 'actions/tasks-actions';
// import { AuthActionTypes } from 'actions/auth-actions';
// import { UserSagaActionTypes } from  '../actions/user-actions'
import { UserSagaActionTypes } from 'actions/user-saga-actions';

import { UserState } from './interfaces';

const defaultState: UserState = {
    users: [],
    count:0,
    fetching: false,
};

export default function (state = defaultState, action: any ): UserState {

    switch (action.type) {
        case UserSagaActionTypes.GET_UERS:
            return {
                ...state,
                fetching: true,
                count: 0,
            };
        case UserSagaActionTypes.LIST_FETCH_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                count:action.payload.count,
                fetching: false,
            };
            case UserSagaActionTypes.LIST_FETCH_FAILED: {
                return {
                    ...state,
                fetching: true,
                count: 0,
                };
            }

        case BoundariesActionTypes.RESET_AFTER_ERROR: {
            return { ...defaultState };
        }
        default:
            return state;
    }
}