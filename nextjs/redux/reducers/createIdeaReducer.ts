import { CreateIdea } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { initialCreateIdeaStore } from "../../ts/init/redux/reducer.initial";

const createIdeaReducer = (
    state: CreateIdea = initialCreateIdeaStore,
    action: AnyAction
): CreateIdea => {
    switch (action.type) {
        case "SET_COMPANY_IDEA":
            return { ...state, selectedCompany: action.company };
        case "SET_STAGE_CREATE_IDEA":
            return { ...state, stage: action.stage };
        case "FETCH_COMPANIES":
            return {
                ...state,
                loadInput: true,
            };
        case "SET_LIST_COMPANIES":
            return {
                ...state,
                loadInput: false,
                companies: action.companies,
            };
        default:
            return state;
    }
};
export default createIdeaReducer;
