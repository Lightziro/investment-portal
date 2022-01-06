import { AnyAction } from "redux";
import { MainStore } from "../../ts/types/redux/store.types";
import { initMainStore } from "../../ts/types/redux/store.init";
import { setNoticeView } from "../utils/user.utils";

const mainReducer = (
    state: MainStore = initMainStore,
    action: AnyAction
): MainStore => {
    switch (action.type) {
        case "SET_USER_DATA":
            console.log("SET USER");
            return { ...state, user: action.userData };
        case "SET_SUCCESS_REGISTER":
            return {
                ...state,
                user: action.userData,
            };
        case "SET_PORTAL_DATA":
            console.log({
                ...state,
                ...action.data,
            });
            return {
                ...state,
                ...action.data,
            };
        case "SET_NOTICE_VIEW":
            return setNoticeView(state, action.noticeId);
        // case "ADD_NEW_IDEA_COMMENT":
        //     return {
        //         ...state,
        //         ideaView: addComment(state.ideaView, action.createComment),
        //     };
        case "SET_PROFILE_VIEW":
            return { ...state, profileView: action.profile };
        case "SET_COUNTRIES":
            return {
                ...state,
                otherData: { ...state.otherData, countries: action.countries },
            };
        case "SET_EXIT_USER":
            return { ...state, user: null };
        case "SET_NEWS":
            return { ...state, news: action.news };
        default:
            return state;
    }
};
export default mainReducer;
