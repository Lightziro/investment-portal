import { AnyAction } from "redux";
import { MainStore } from "../../ts/types/redux/store.types";
import {
    initialIdeaView,
    initMainStore,
} from "../../ts/types/redux/store.init";
import { setNoticeView } from "../utils/user.utils";
import { addComment } from "../utils/idea.utils";

const mainReducer = (
    state: MainStore = initMainStore,
    action: AnyAction
): MainStore => {
    switch (action.type) {
        case "SET_USER_DATA":
            return { ...state, user: action.userData };
        case "SET_SUCCESS_REGISTER":
            return {
                ...state,
                user: action.userData,
            };
        case "SET_PORTAL_DATA":
            return {
                ...state,
                ...action.data,
            };
        case "SET_NOTICE_VIEW":
            return setNoticeView(state, action.noticeId);
        case "SET_IDEA_VIEW_DATA":
            return { ...state, ideaView: action.data };
        case "FETCH_INVESTMENT_IDEA":
            return {
                ...state,
                ideaView: {
                    ...state.ideaView,
                    ideaInfo: null,
                    companyInfo: null,
                    analyticsStats: null,
                    authorInfo: null,
                    epsStats: null,
                },
            };
        case "ADD_NEW_IDEA_COMMENT":
            return {
                ...state,
                ideaView: addComment(state.ideaView, action.createComment),
            };
        case "CLEAR_IDEA_DATA":
            return { ...state, ideaView: initialIdeaView };
        case "SET_PROFILE_VIEW":
            return { ...state, profileView: action.profile };
        case "SET_COUNTRIES":
            return {
                ...state,
                otherData: { ...state.otherData, countries: action.countries },
            };
        case "SET_PROFILE_DATA":
            return {
                ...state,
                profileView: action.updateData,
            };
        default:
            return state;
    }
};
export default mainReducer;
