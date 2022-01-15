import { ViewStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import {
    addCommentArticle,
    addCommentEntity,
    addCommentIdea,
    initialByEntity,
} from "../utils/view.utils";

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
        default:
            return state;
    }
};
export default viewReducer;
