import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { ApiService } from "../../utils/api";
import { AnyAction } from "redux";
import { InvestmentData } from "../../ts/types/redux/store.types";
import axios from "axios";

const api = new ApiService();
function* authorizationUser(action: AnyAction): Generator {
    const userOrError = yield api
        .post("/api/user/login", action.data)
        .then((response) => response);
    yield put({ type: action.type });
}
function* fetchInvestmentData(action: AnyAction): Generator {
    const data = yield api
        .get("/api/investment-data/portal")
        .then((response) => response);
    yield put({
        type: "SET_PORTAL_DATA",
        data,
    });
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
function* fetchInvestmentIdea(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`/api/investment-data/idea/${action.ideaId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_IDEA_VIEW_DATA",
            data,
        });
    } catch (error) {}
}
export function* actionMainWatcher(): SagaIterator {
    yield takeLatest("USER_LOGIN", authorizationUser);
    yield takeLatest("FETCH_INVESTMENT_DATA", fetchInvestmentData);
    yield takeLatest("VIEW_NOTICE", viewNotice);
    yield takeLatest("FETCH_INVESTMENT_IDEA", fetchInvestmentIdea);
}
