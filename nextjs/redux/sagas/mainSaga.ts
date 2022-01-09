import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import axios from "axios";
import cookie from "cookie";

function* fetchInvestmentData(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`${process.env.API_URL_DOCKER}/api/investment-data/portal`)
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
        const result = yield axios
            .post("/api/user/notice/view", { id: action.id })
            .then((response) => response.data);
        yield put({
            type: "SET_NOTICE_VIEW",
            noticeId: action.id,
        });
    } catch (error) {
        yield put({
            type: "SET_ERROR_NOTICE_VIEW",
            noticeId: action.id,
        });
    }
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
function* authUser(action: AnyAction): Generator {
    try {
        const data = yield axios
            .post(`${process.env.API_URL}/api/user/login`, action.userData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN":
                        cookie.parse(document.cookie)["XSRF-TOKEN"] || false,
                },
            })
            .then((response) => response.data);
        localStorage.setItem("token", data.token);
        yield put({
            type: "SET_USER_DATA",
            userData: data.user,
        });
    } catch (error) {
        console.log("ERROR", error);
        // yield put({
        //     type: "SET_ALERT_ERROR",
        //     message: error.response.data.error,
        // });
    }
}
function* fetchCountries(action: AnyAction): Generator {
    try {
        const countries = yield axios
            .get("/api/other/countries")
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
            .post("/api/other/subscribe-email", { email: action.email })
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

export function* actionMainWatcher(): SagaIterator {
    yield takeLatest("FETCH_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("VIEW_NOTICE", viewNotice);
    yield takeLatest("REGISTER_USER", registerUser);
    yield takeLatest("AUTH_USER", authUser);
    yield takeLatest("FETCH_COUNTRIES", fetchCountries);
    yield takeLatest("SUBSCRIBE_TO_NEWS", subscribeNews);
    yield takeLatest("FETCH_NEWS", fetchNews);
}
