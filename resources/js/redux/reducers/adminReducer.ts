import { AnyAction } from "redux";
import { AdminStore, MainStore } from "../../ts/types/redux/store.types";
import {
    initialAdminStore,
    initMainStore,
} from "../../ts/types/redux/store.init";

const adminReducer = (
    state: AdminStore = initialAdminStore,
    action: AnyAction
): AdminStore => {
    switch (action.type) {
        case "SET_INVESTMENT_DATA":
            return { ...state, investmentIdeas: action.data };
        default:
            return state;
    }
};
export default adminReducer;
