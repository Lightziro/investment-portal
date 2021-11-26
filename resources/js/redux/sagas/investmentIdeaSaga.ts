import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import axios from "axios";

function* createComment(action: AnyAction): Generator {
    try {
        const createComment = yield axios
            .post("/api/investment-idea/create-comment", action.commentData)
            .then((response) => response.data);
        yield put({
            type: "ADD_NEW_IDEA_COMMENT",
            createComment,
        });
    } catch (e) {}
}

export function* actionInvestmentIdea(): SagaIterator {
    yield takeLatest("CREATE_IDEA_COMMENT", createComment);
}
