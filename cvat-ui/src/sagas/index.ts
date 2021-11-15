
import { all, put, takeEvery,takeLatest,call } from 'redux-saga/effects';
import{AuthActionTypes} from 'actions/index';
import getCore from 'cvat-core-wrapper';
const cvat = getCore();


function* login(action:any):any {
console.log("loginall",action)
try {
// const endpoint = cvat.server.login(action.payload.username,action.payload.password);
// console.log("endpoint",endpoint)
//  const response = yield call(endpoint);
const users = cvat.users.get({ self: true });
// console.log("endpointres",response)
// const data = yield response.json();
// const user = yield call());
// yield put({type: "USER_FETCH_SUCCEEDED", user: user});
} catch (e) {
// yield put({type: "USER_FETCH_FAILED", message: e.message});
}

}
function* loginWatcher() {
yield takeLatest(AuthActionTypes.LOGIN, login)
}
export default function* rootSaga() {
yield all([
loginWatcher(),
]);
}