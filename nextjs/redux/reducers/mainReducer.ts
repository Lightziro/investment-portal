import { AnyAction } from "redux";
import { initMainStore } from "../../ts/types/redux/store.init";
import { MainStore } from "../ts/types/main/main-store.types";

const mainReducer = (
    state: MainStore = initMainStore,
    action: AnyAction
): MainStore => {
    switch (action.type) {
        case "SET_PORTAL_DATA":
            return {
                ...state,
                ...action.data,
            };
        case "SET_COUNTRIES":
            return {
                ...state,
                otherData: { ...state.otherData, countries: action.countries },
            };
        case "SET_NEWS":
            return { ...state, news: action.news };
        default:
            return state;
    }
};
export default mainReducer;
