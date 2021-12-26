import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import axios from "axios";

function* createComment(action: AnyAction): Generator {
    try {
        const commentData = yield axios
            .post("/api/investment-idea/create-comment", action.commentData)
            .then((response) => response.data);
        yield put({
            type: "ADD_NEW_IDEA_COMMENT",
            commentData,
        });
    } catch (e) {}
}
function* fetchIdeaData(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`/api/investment-data/idea/${action.ideaId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_ENTITY_DATA",
            entity: "idea",
            data,
        });
    } catch (e) {}
}

export function* actionInvestmentIdea(): SagaIterator {
    yield takeLatest("CREATE_IDEA_COMMENT", createComment);
    yield takeLatest("FETCH_INVESTMENT_IDEA", fetchIdeaData);
}
