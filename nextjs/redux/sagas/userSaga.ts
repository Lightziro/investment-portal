import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";
import { ErrorsResponse } from "../../ts/enums/errors.enums";

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
        yield put({
            type: "SET_FETCH",
            state: true,
        });
    }
}
function* login(action: AnyAction): Generator {
    try {
        yield axios.get(`${process.env.API_URL}/sanctum/csrf-cookie`);
        const user = yield axios
            .post(`${process.env.API_URL}/login`, action.userData)
            .then((response) => response.data);

        yield put({
            type: "SET_USER",
            user,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "You successfully logged",
        });
    } catch (e) {
        let textError = ErrorsResponse.Catch;
        switch (e.response.status) {
            case 403:
                textError = ErrorsResponse.InvalidPassword;
                break;
            case 404:
                textError = ErrorsResponse.NotFoundUser;
                break;
            case 415:
                textError = ErrorsResponse.InvalidFields;
                break;
        }
        yield put({
            type: "SET_ALERT_ERROR",
            message: textError,
        });
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
