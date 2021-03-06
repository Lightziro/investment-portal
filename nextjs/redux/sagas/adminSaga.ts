import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { ResponseRetrainClassifier } from "../../ts/types/response/response.types";
import { axios } from "../../utils/axios";
import { getSectionByEntity } from "../utils/admin.utils";
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
            .get(`${process.env.API_URL}/api/admin/companies/${action.name}`)
            .then((res) => res.data);
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
function* fetchAdminIdeas(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(
                `${process.env.API_URL}/api/admin/investment-idea/list/${action.page}`
            )
            .then((res) => res.data);
        yield put({
            type: "SET_SECTION_LIST",
            data,
            section: "investment-idea",
        });
    } catch (e) {}
}
function* fetchArticleForAdmin(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`${process.env.API_URL}/api/admin/article/get/${action.page}`)
            .then((response) => response.data);
        yield put({
            type: "SET_SECTION_LIST",
            data,
            section: "articles",
        });
    } catch (e) {}
}
function* fetchEntityList(action: AnyAction): Generator {
    try {
        const { entity, page } = action;
        const section = getSectionByEntity(entity);
        const data = yield axios
            .get(`${process.env.API_URL}/api/admin/${entity}/list/${page}`)
            .then((res) => res.data);
        yield put({
            type: "SET_SECTION_LIST",
            data,
            section,
        });
    } catch (e) {}
}
export function* actionAdminWatcher(): SagaIterator {
    yield takeLatest("FETCH_ADMIN_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("FETCH_COMPANIES", fetchCompanies);
    yield takeLatest("FETCH_ARTICLE_ADMIN_LIST", fetchArticleForAdmin);
    yield takeLatest("FETCH_ANALYTIC_DATA", fetchAnalyticData);
    yield takeLatest("RETRAIN_NEWS_CLASSIFIER", retrainClassifierNews);
    yield takeLatest("FETCH_ADMIN_IDEAS", fetchAdminIdeas);
    yield takeLatest("FETCH_ADMIN_ENTITY_LIST", fetchEntityList);
}
