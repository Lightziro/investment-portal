import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AnyAction } from "redux";

function* fetchProfileView(action: AnyAction): Generator {
    try {
        const profile = yield axios
            .get(`/api/user/profile/${action.userId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_PROFILE_VIEW",
            profile,
        });
    } catch (e) {}
}
function* updateProfile(action: AnyAction): Generator {
    try {
        const updateData = yield axios
            .post("/api/user/profile/update", action.form)
            .then((response) => response.data);
        yield put({
            type: "SET_PROFILE_DATA",
            updateData,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "You have successfully updated your profile data",
        });
    } catch (e) {}
}

export function* actionProfileWatcher(): SagaIterator {
    yield takeLatest("FETCH_PROFILE_VIEW", fetchProfileView);
    yield takeLatest("UPDATE_PROFILE_DATA", updateProfile);
}
