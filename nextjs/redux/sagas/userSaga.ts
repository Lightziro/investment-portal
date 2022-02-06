import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";
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
        const user = yield axios
            .post(`${process.env.API_URL}/login`, action.userData)
            .then((response) => response.data)
            .catch((e) => null);

        yield put({
            type: "SET_USER",
            user,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "SUCCESS AUTH!",
        });
    } catch (e) {
        console.log(e);
    }
}
function* logout(): Generator {
    try {
        yield axios.get(`${process.env.API_URL}/logout`);
        yield put({
            type: "SET_USER",
            user: null,
        });
    } catch (e) {}
}
export function* actionUserWatcher(): SagaIterator {
    yield takeLatest("FETCH_USER", fetchUser);
    yield takeLatest("LOGIN_USER", login);
    yield takeLatest("LOGOUT_USER", logout);
}
