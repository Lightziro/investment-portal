import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";
import { requestViewNotice } from "../../utils/api/user-api";

function* userPrediction(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`${process.env.API_URL}/api/user/predictions/list`)
            .then((res) => res.data);
        yield put({
            type: "SET_PREDICTION_LIST",
            data,
        });
    } catch (e) {}
}
function* deletePredict(action: AnyAction): Generator {
    try {
        const { predictId } = action;
        yield axios
            .delete(`${process.env.API_URL}/api/user/predictions/${predictId}`)
            .then((res) => res.data);
        yield put({
            type: "REMOVE_PREDICT_ITEM",
            predictId,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "Success delete",
        });
    } catch (e) {}
}
function* fetchNotices(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`${process.env.API_URL}/api/user/notices`)
            .then((res) => res.data);
        yield put({
            type: "SET_USER_NOTICES",
            data,
        });
    } catch (e) {}
}
function* viewNotice(action: AnyAction): Generator {
    try {
        yield requestViewNotice(action.id);
        yield put({
            type: "SET_NOTICE_VIEW",
            id: action.id,
        });
    } catch (e) {}
}

export function* actionAccountWatcher(): SagaIterator {
    yield takeLatest("FETCH_USER_PREDICTION", userPrediction);
    yield takeLatest("SEND_DELETE_PREDICT", deletePredict);
    yield takeLatest("FETCH_USER_NOTICES", fetchNotices);
    yield takeLatest("SEND_VIEW_NOTICE", viewNotice);
}
