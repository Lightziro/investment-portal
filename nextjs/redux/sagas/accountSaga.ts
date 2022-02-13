import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";

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

export function* actionAccountWatcher(): SagaIterator {
    yield takeLatest("FETCH_USER_PREDICTION", userPrediction);
    yield takeLatest("SEND_DELETE_PREDICT", deletePredict);
}
