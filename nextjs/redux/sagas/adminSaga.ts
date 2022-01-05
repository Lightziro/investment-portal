import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import axios from "axios";
import { ResponseRetrainClassifier } from "../../ts/types/response/response.types";
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
            .get(`/api/admin/companies/${action.name}`)
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
function* retrainClassifierNews(action: AnyAction): Generator {
    try {
        const resultTrain: ResponseRetrainClassifier | any = yield axios
            .post(
                "/api/admin/smart-analytic/train-news-classifier",
                action.trainData
            )
            .then((response) => response.data);
        if (resultTrain.newScore) {
            yield put({
                type: "SET_ALERT_SUCCESS",
                message: resultTrain.message,
            });
        } else {
            yield put({ type: "SET_ALERT_INFO", message: resultTrain.message });
        }
    } catch (e) {}
}
function* sendToAnalyzeIdea(action: AnyAction): Generator {
    try {
        const ideaData = yield axios
            .post("/api/admin/investment-idea/create", action.form)
            .then((response) => response.data);
        yield put({
            type: "SET_CREATED_IDEA",
            ideaData,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message:
                "You successfully created an idea, when a smart analytical analyzes, you will receive an alert",
        });
    } catch (e) {}
}
export function* actionAdminWatcher(): SagaIterator {
    yield takeLatest("FETCH_ADMIN_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("FETCH_COMPANIES", fetchCompanies);
    yield takeLatest("FETCH_ANALYTIC_DATA", fetchAnalyticData);
    yield takeLatest("RETRAIN_NEWS_CLASSIFIER", retrainClassifierNews);
    yield takeLatest("SEND_TO_ANALYZE", sendToAnalyzeIdea);
}
