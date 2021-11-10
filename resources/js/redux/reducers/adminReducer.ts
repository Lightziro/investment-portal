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
        case "SET_ADMIN_INVESTMENT_DATA":
            return { ...state, investmentIdeas: action.data };
        case "FETCH_COMPANIES":
            return {
                ...state,
                createIdea: { ...state.createIdea, loadInput: true },
            };
        case "SET_LIST_COMPANIES":
            return {
                ...state,
                createIdea: {
                    ...state.createIdea,
                    loadInput: false,
                    companies: action.companies,
                },
            };
        case "SET_SELECT_COMPANY_ANALYTICS":
            return {
                ...state,
                createIdea: {
                    ...state.createIdea,
                    selectedCompany: action.id,
                    stage: 2,
                },
            };
        default:
            return state;
    }
};
export default adminReducer;
