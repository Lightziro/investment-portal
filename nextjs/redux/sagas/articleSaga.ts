import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { axios } from "../../utils/axios";

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

function* updateArticle(action: AnyAction): Generator {
    try {
        const articleData = yield axios
            .post("/api/admin/article/update", action.articleForm)
            .then((response) => response.data);
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "Article successful updated",
        });
        yield put({ type: "REPLACE_UPDATE_ARTICLE", articleData });
    } catch (e) {}
}

function* fetchArticleView(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(`/api/article/get/${action.articleId}`)
            .then((response) => response.data);
        yield put({
            type: "SET_VIEW_ENTITY",
            entity: "article",
            data,
        });
    } catch (e) {}
}

function* createArticleComment(action: AnyAction): Generator {
    try {
        const comment = yield axios
            .post(
                `${process.env.API_URL}/api/article/create-comment`,
                action.commentData
            )
            .then((response) => response.data);
        yield put({
            type: "ADD_NEW_ARTICLE_COMMENT",
            comment,
        });
    } catch (e) {
        yield put({
            type: "SET_ALERT_ERROR",
            message: "Error occurred, try again later",
        });
    }
}

function* deleteArticle(action: AnyAction): Generator {
    try {
        const articlesData = yield axios
            .post(`/api/admin/article/delete`, {
                page: action.page,
                articleId: action.articleId,
            })
            .then((response) => response.data);
        yield put({
            type: "SET_ARTICLES_LIST",
            articlesData,
        });
        yield put({
            type: "SET_ALERT_SUCCESS",
            message: "Entity successfully deleted",
        });
    } catch (e) {}
}

function* fetchComments(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(
                `${process.env.API_URL}/api/article/${action.articleId}/comments`
            )
            .then((res) => res.data);
        yield put({
            type: "SET_ARTICLE_COMMENTS",
            data,
        });
    } catch (e) {}
}

function* fetchLabels(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(
                `${process.env.API_URL}/api/article/${action.articleId}/labels`
            )
            .then((res) => res.data);
        yield put({
            type: "SET_ARTICLE_LABELS",
            data,
        });
    } catch (e) {}
}

function* fetchEmotions(action: AnyAction): Generator {
    try {
        const data = yield axios
            .get(
                `${process.env.API_URL}/api/article/${action.articleId}/emotions`
            )
            .then((res) => res.data);
        yield put({
            type: "SET_ARTICLE_EMOTIONS",
            data,
        });
    } catch (e) {}
}
function* createEmotion(action: AnyAction): Generator {
    try {
        const data = yield axios
            .post(
                `${process.env.API_URL}/api/article/${action.articleId}/emotions`,
                { emotion: action.emotionCode }
            )
            .then((res) => res.data);
        yield put({
            type: "SET_ARTICLE_EMOTIONS",
            data,
        });
    } catch (e) {}
}
function* changeEmotion(action: AnyAction): Generator {
    try {
        const data = yield axios
            .put(
                `${process.env.API_URL}/api/article/${action.articleId}/emotions/${action.emotionId}`,
                { emotion: action.emotionCode }
            )
            .then((res) => res.data);
        yield put({
            type: "CHANGE_EMOTION",
            data,
        });
    } catch (e) {}
}

export function* actionArticleWatcher(): SagaIterator {
    yield takeLatest("CREATE_ARTICLE", createArticle);
    yield takeLatest("FETCH_ARTICLE_VIEW", fetchArticleView);
    yield takeLatest("CREATE_ARTICLE_COMMENT", createArticleComment);
    yield takeLatest("UPDATE_ARTICLE", updateArticle);
    yield takeLatest("DELETE_ARTICLE", deleteArticle);
    yield takeLatest("FETCH_ARTICLE_COMMENTS", fetchComments);
    yield takeLatest("FETCH_ARTICLE_LABELS", fetchLabels);
    yield takeLatest("FETCH_ARTICLE_EMOTIONS", fetchEmotions);
    yield takeLatest("SEND_CREATE_EMOTION", createEmotion);
    yield takeLatest("SEND_CHANGE_EMOTION", changeEmotion);
}
