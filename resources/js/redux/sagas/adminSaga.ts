import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { ApiService } from "../../utils/api";
const api = new ApiService();
function* fetchInvestmentData(action: AnyAction): Generator {
    console.log(123321);
    const data = yield api
        .get("/api/investment-data/get")
        .then((response) => response);
    yield put({
        type: "SET_INVESTMENT_DATA",
        data,
    });
}
export function* actionAdminWatcher(): SagaIterator {
    yield takeLatest("FETCH_INVESTMENT_DATA", fetchInvestmentData);
}
