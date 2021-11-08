import { AnyAction } from "redux";
import { MainStore } from "../../ts/types/redux/store.types";
import { initMainStore } from "../../ts/types/redux/store.init";
import { setNoticeView } from "../utils/user.utils";
import { setAlert } from "../utils/alert.utils";

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
                alert: setAlert("You successfully registered"),
            };
        case "SET_PORTAL_DATA":
            console.log("PORTAL", action.data);
            return {
                ...state,
                news: action.data.news,
                investmentData: action.data.investmentData,
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
        case "CLEAR_ALERT":
            return { ...state, alert: null };
        case "SET_ALERT_ERROR":
            return { ...state, alert: setAlert(action.message, "error") };
        default:
            return state;
    }
};
export default mainReducer;
