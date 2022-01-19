import { AnyAction } from "redux";
import {
    initialAdminStore,
    initMainStore,
} from "../../ts/types/redux/store.init";
import { replaceUpdateArticle, setEditArticle } from "../utils/article.utils";
import createIdeaReducer from "./createIdeaReducer";
import { AdminStore } from "../ts/types/admin/admin-store.types";
import { setUsersList, setUsersStats } from "../utils/admin.utils";

const adminReducer = (
    state: AdminStore = initialAdminStore,
    action: AnyAction
): AdminStore => {
    switch (action.type) {
        case "SET_ADMIN_INVESTMENT_DATA":
            return { ...state, investmentIdeas: action.data };
        case "SET_USERS_STATS":
            return {
                ...state,
                users: setUsersStats(state.users, action.stats),
            };
        case "SET_SMART_ANALYTIC_DATA":
            return {
                ...state,
                smartAnalytic: {
                    ...state.smartAnalytic,
                    score: action.data.score,
                },
            };
        case "SET_ARTICLES_LIST":
            return {
                ...state,
                articles: {
                    ...state.articles,
                    list: action.articlesData.items,
                    loading: false,
                    lastPage: action.articlesData.lastPage,
                },
            };
        case "FETCH_USERS_BY_PAGE":
            return { ...state, users: { ...state.users, list: [] } };
        case "FETCH_ARTICLE_ADMIN_LIST":
        case "DELETE_ARTICLE":
            return {
                ...state,
                articles: {
                    ...state.articles,
                    loading: true,
                },
            };
        case "SET_EDIT_ARTICLE":
            return {
                ...state,
                articles: setEditArticle(state.articles, action.articleId),
            };
        case "SET_ARTICLE_DIALOG":
            return {
                ...state,
                articles: { ...state.articles, dialog: action.state },
            };
        case "REPLACE_UPDATE_ARTICLE":
            return {
                ...state,
                articles: replaceUpdateArticle(
                    state.articles,
                    action.articleData
                ),
            };
        case "SET_ADMIN_USERS":
            return {
                ...state,
                users: setUsersList(state.users, action.data),
            };
        default:
            return {
                ...state,
                createIdea: createIdeaReducer(state.createIdea, action),
            };
    }
};
export default adminReducer;
