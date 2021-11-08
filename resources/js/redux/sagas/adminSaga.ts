import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { ApiService } from "../../utils/api";
import axios from "axios";
function* fetchInvestmentData(action: AnyAction): Generator {
    try {
        console.log("try");
        const data = yield axios
            .get("/api/admin/investment-data")
            .then((response) => response.data);
        yield put({
            type: "SET_ADMIN_INVESTMENT_DATA",
            data,
        });
    } catch (error) {}
}
export function* actionAdminWatcher(): SagaIterator {
    yield takeLatest("FETCH_ADMIN_INVESTMENT_DATA", fetchInvestmentData);
}
