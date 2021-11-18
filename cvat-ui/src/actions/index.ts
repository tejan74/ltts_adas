



// ... addToDo ...
export enum AuthActionTypes {
AUTHORIZED_SUCCESS = 'AUTHORIZED_SUCCESS',
AUTHORIZED_FAILED = 'AUTHORIZED_FAILED',
LOGIN = 'LOGIN',
LOGIN_SUCCESS = 'LOGIN_SUCCESS',
LOGIN_FAILED = 'LOGIN_FAILED',
GET_NEWS ='GET_NEWS',
}
export function loginwithsaga(username:string,password:string) {
return {
type: AuthActionTypes.LOGIN,
payload:{username,password}
};
}



export function getNews() {
alert("button")
return{
type: 'GET_NEWS',
}
}