import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";

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
            .get(`${process.env.API_URL}/idea/get/${action.ideaId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_VIEW_ENTITY",
            entity: "idea",
            data,
        });
    } catch (e) {}
}
function* fetchIdeaRating(action: AnyAction): Generator {
    const data = yield axios
        .get(`${process.env.API_URL}/api/idea/user-rating/${action.ideaId}`)
        .then((res) => {
            switch (res.status) {
                case 204:
                    return null;
                case 200:
                    return res.data;
            }
        })
        .catch((e) => null);
    yield put({
        type: "SET_USER_IDEA_RATING",
        data,
    });
}

export function* actionInvestmentIdea(): SagaIterator {
    yield takeLatest("CREATE_IDEA_COMMENT", createComment);
    yield takeLatest("FETCH_INVESTMENT_IDEA", fetchIdeaData);
    yield takeLatest("FETCH_USER_IDEA_RATING", fetchIdeaRating);
}
