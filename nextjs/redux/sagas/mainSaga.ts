import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";
import { requestViewNotice } from "../../utils/api/user-api";

function* fetchInvestmentData(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`${process.env.API_URL_DOCKER}/api/init/portal-data`)
            .then((response) => response.data);
        yield put({
            type: "SET_PORTAL_DATA",
            data,
        });
    } catch (e) {
        console.log("ERROR", e);
    }
}
function* viewNotice(action: AnyAction): Generator {
    try {
        yield requestViewNotice(action.id);
        yield put({
            type: "SET_NOTICE_VIEW",
            id: action.id,
        });
    } catch (error) {}
}
function* registerUser(action: AnyAction): Generator {
    try {
        const userData = yield axios
            .post("/api/user/register", action.form)
            .then((response) => response.data);
        yield put({
            type: "SET_SUCCESS_REGISTER",
            userData,
        });
    } catch (error) {
        yield put({
            type: "SET_ALERT_ERROR",
            message: error.response.data.error,
        });
    }
}
function* fetchCountries(action: AnyAction): Generator {
    try {
        const countries = yield axios
            .get(`${process.env.API_URL}/api/other/countries`)
            .then((response) => response.data);
        yield put({
            type: "SET_COUNTRIES",
            countries,
        });
    } catch (e) {}
}
function* subscribeNews(action: AnyAction): Generator {
    try {
        yield axios
            .post(`${process.env.API_URL}/api/other/subscribe-email`, {
                email: action.email,
            })
            .then((response) => response.data);
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "You successfully subscribed portal news",
        });
    } catch (e) {
        yield put({
            type: "SET_ALERT_ERROR",
            message: "Failed subscribe. Try again later",
        });
    }
}
function* fetchNews(action: AnyAction): Generator {
    try {
        const news = yield axios
            .get("/api/investment-data/news")
            .then((response) => response.data);
        yield put({
            type: "SET_NEWS",
            news,
        });
    } catch (e) {}
}
function* createEntityComment(action: AnyAction): Generator {
    const { entityType, entityId, text } = action;
    try {
        const comment = yield axios
            .post(`${process.env.API_URL}/api/${entityType}/create-comment`, {
                comment: text,
                entityId,
            })
            .then((response) => response.data);
        yield put({
            type: "ADD_ENTITY_COMMENT",
            comment,
            entity: entityType,
        });
    } catch (e) {}
}

export function* actionMainWatcher(): SagaIterator {
    yield takeLatest("FETCH_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("VIEW_NOTICE", viewNotice);
    yield takeLatest("REGISTER_USER", registerUser);
    yield takeLatest("FETCH_COUNTRIES", fetchCountries);
    yield takeLatest("SUBSCRIBE_TO_NEWS", subscribeNews);
    yield takeLatest("FETCH_NEWS", fetchNews);
    yield takeLatest("CREATE_ENTITY_COMMENT", createEntityComment);
}
