import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import axios from "../../utils/axios";
import { AnyAction } from "redux";
function* fetchUser(): Generator {
    try {
        const user = yield axios
            .get(`${process.env.API_URL}/api/user/authentication`)
            .then((res) => res.data);
        yield put({
            type: "SET_USER",
            user,
        });
    } catch (e) {
        console.log(e, "ERROR API");
    }
}
function* login(action: AnyAction): Generator {
    try {
        yield axios.get(`${process.env.API_URL}/sanctum/csrf-cookie`);
        const user = yield axios.post(
            `${process.env.API_URL}/api/user/login`,
            action.userData
        );
        yield put({
            type: "SET_USER",
            user,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "SUCCESS AUTH!",
        });
    } catch (e) {
        console.log("ERROR AUTH");
    }
}
export function* actionUserWatcher(): SagaIterator {
    yield takeLatest("FETCH_USER", fetchUser);
    yield takeLatest("LOGIN_USER", login);
}
