import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { ApiService } from "../../utils/api";
import axios from "axios";
function* fetchInvestmentData(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get("/api/admin/investment-data")
            .then((response) => response.data);
        yield put({
            type: "SET_ADMIN_INVESTMENT_DATA",
            data,
        });
    } catch (error) {}
}
function* fetchCompanies(action: AnyAction): Generator {
    try {
        const companies = yield axios
            .post("/api/admin/companies", { name: action.name })
            .then((response) => response.data);
        yield put({
            type: "SET_LIST_COMPANIES",
            companies,
        });
    } catch (e) {}
}
function* fetchAnalyticData(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get("/api/admin/smart-analytic/data")
            .then((response) => response.data);
        yield put({ type: "SET_SMART_ANALYTIC_DATA", data });
    } catch (e) {}
}

export function* actionAdminWatcher(): SagaIterator {
    yield takeLatest("FETCH_ADMIN_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("FETCH_COMPANIES", fetchCompanies);
    yield takeLatest("FETCH_ANALYTIC_DATA", fetchAnalyticData);
}
