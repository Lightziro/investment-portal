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
            return { ...state, user: action.userData };
        case "SET_PORTAL_DATA":
            return {
                ...state,
                news: action.data.news,
                investmentData: {
                    ...state.investmentData,
                    bestProfit: action.data.bestProfit,
                    worseProfit: action.data.worseProfit,
                },
            };
        case "SET_NOTICE_VIEW":
            return setNoticeView(state, action.noticeId);
        default:
            return state;
    }
};
export default mainReducer;
