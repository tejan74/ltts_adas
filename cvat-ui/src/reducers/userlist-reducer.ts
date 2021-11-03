//import { AnyAction } from 'redux';
//import { omit } from 'lodash';
import { BoundariesActionTypes } from '../actions/boundaries-actions';
// import { TasksActionTypes } from 'actions/tasks-actions';
// import { AuthActionTypes } from 'actions/auth-actions';
import { UserActionTypes } from  '../actions/user-actions'

import { UserState } from './interfaces';

const defaultState: UserState = {
    users: []
    // dateJoined: number,
    // email: string | null,
    // firstName: string | null;
    // groups: string | null;
    // id: string | null;
    // isActive: boolean | null;
    // isStaff: boolean | null;
    // isSuperuser: boolean | null;
    // isVerified: boolean |null;
    // lastLogin: number |null;
    // lastName: string | null;
    // username: string | null;
};

export default function (state = defaultState, action: any ): UserState {
    switch (action.type) {

        case UserActionTypes.LIST_FETCH_SUCCESS:
            return {
                ...state,
                users: action.payload.users
                // authActionsFetching: false,
                // authActionsInitialized: true,
                // allowChangePassword: action.payload.allowChangePassword,
                // allowResetPassword: action.payload.allowResetPassword,
            };

        case BoundariesActionTypes.RESET_AFTER_ERROR: {
            return { ...defaultState };
        }
        default:
            return state;
    }
}