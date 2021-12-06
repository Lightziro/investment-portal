import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import axios from "axios";
function* createArticle(action: AnyAction): Generator {
    try {
        const articleData = yield axios
            .post("/api/admin/article/create", action.articleForm)
            .then((response) => response.data);
    } catch (e) {
        yield put({
            type: "SET_ALERT_ERROR",
            message: e.response.data.message,
        });
    }
}
function* fetchArticleForAdmin(action: AnyAction): Generator {
    try {
        const articlesData = yield axios
            .get(`/api/admin/article/get/${action.page}`)
            .then((response) => response.data);
        yield put({
            type: "SET_ARTICLES_LIST",
            articlesData,
        });
    } catch (e) {}
}
function* fetchArticleView(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`/api/article/get/${action.articleId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_ARTICLE_DATA",
            data,
        });
    } catch (e) {}
}
function* createArticleComment(action: AnyAction): Generator {
    try {
        const comment = yield axios
            .post("/api/article/create-comment", action.commentData)
            .then((response) => response.data);
        yield put({
            type: "ADD_NEW_ARTICLE_COMMENT",
            comment,
        });
    } catch (e) {}
}
export function* actionArticleWatcher(): SagaIterator {
    yield takeLatest("CREATE_ARTICLE", createArticle);
    yield takeLatest("FETCH_ARTICLE_VIEW", fetchArticleView);
    yield takeLatest("FETCH_ARTICLE_FOR_ADMIN", fetchArticleForAdmin);
    yield takeLatest("CREATE_ARTICLE_COMMENT", createArticleComment);
}
