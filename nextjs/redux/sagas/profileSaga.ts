import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";

function* fetchProfileView(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`/api/user/profile/${action.userId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_VIEW_ENTITY",
            entity: "profile",
            data,
        });
    } catch (e) {}
}
function* updateProfile(action: AnyAction): Generator {
    try {
        const data = yield axios
            .post(`${process.env.API_URL}/api/user/profile/update`, action.form)
            .then((response) => response.data);
        yield put({
            type: "SET_VIEW_ENTITY",
            entity: "profile",
            data,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "You have successfully updated your profile data",
        });
    } catch (e) {
        yield put({
            type: "SET_ALERT_ERROR",
            message: "Error occurred, try again later",
        });
    }
}

export function* actionProfileWatcher(): SagaIterator {
    yield takeLatest("FETCH_PROFILE_VIEW", fetchProfileView);
    yield takeLatest("UPDATE_PROFILE_DATA", updateProfile);
}
