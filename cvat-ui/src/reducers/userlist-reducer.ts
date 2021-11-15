//import { AnyAction } from 'redux';
//import { omit } from 'lodash';
import { BoundariesActionTypes } from '../actions/boundaries-actions';
// import { TasksActionTypes } from 'actions/tasks-actions';
// import { AuthActionTypes } from 'actions/auth-actions';
import { UserActionTypes } from  '../actions/user-actions'

import { UserState } from './interfaces';

const defaultState: UserState = {
    users: [],
    count:0,
    fetching: false,
};

export default function (state = defaultState, action: any ): UserState {

    switch (action.type) {
        case UserActionTypes.GET_UERS:
            return {
                ...state,
                fetching: true,
                count: 0,
            };
        case UserActionTypes.LIST_FETCH_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                count:action.payload.count,
                fetching: false,
            };
            case UserActionTypes.LIST_FETCH_FAILED: {
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