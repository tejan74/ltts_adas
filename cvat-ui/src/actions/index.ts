



// ... addToDo ...
export enum AuthActionTypes {
AUTHORIZED_SUCCESS = 'AUTHORIZED_SUCCESS',
AUTHORIZED_FAILED = 'AUTHORIZED_FAILED',
LOGIN = 'LOGIN',
LOGIN_SUCCESS = 'LOGIN_SUCCESS',
LOGIN_FAILED = 'LOGIN_FAILED',
LOGOUT = 'LOGOUT',
LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
 LOGOUT_FAILED = 'LOGOUT_FAILED',
}
export function loginwithsaga(username:string,password:string) {
return {
type: AuthActionTypes.LOGIN,
payload:{username,password}
};
}



export function logoutAsync() {
    return {
    type: AuthActionTypes.LOGOUT,
    };

    }