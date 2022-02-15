import { AnyAction } from "redux";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import {
    addCommentEntity,
    createIdeaRating,
    initialByEntity,
    setEntityComments,
    setIdeaCompanyStats,
    setIdeaRating,
    setIdeaUserRating,
} from "../utils/view.utils";
import { ViewStore } from "../ts/types/view/view-store.types";

const viewReducer = (
    state: ViewStore = initialViewStore,
    action: AnyAction
): ViewStore => {
    switch (action.type) {
        case "SET_VIEW_ENTITY":
            return { ...state, [action.entity]: action.data };
        case "CLEAR_VIEW":
            return {
                ...state,
                [action.entity]: initialByEntity[action.entity],
            };
        case "ADD_ENTITY_COMMENT":
            const { entity, comment } = action;
            return {
                ...state,
                [entity]: addCommentEntity(state[entity], comment),
            };
        case "SET_USER_IDEA_RATING":
            return setIdeaUserRating(state, action.data);
        case "SET_IDEA_RATING":
            return setIdeaRating(state, action.data);
        case "SET_IDEA_COMMENTS":
            return setEntityComments(state, "idea", action.data);
        case "SET_IDEA_COMPANY_STATS":
            return setIdeaCompanyStats(state, action.data);
        case "CREATE_IDEA_RATING":
            return createIdeaRating(state, action.data);
        default:
            return state;
    }
};
export default viewReducer;
