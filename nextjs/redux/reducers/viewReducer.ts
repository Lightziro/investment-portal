import { ViewStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import {
    addCommentArticle,
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
        case "ADD_NEW_ARTICLE_COMMENT":
            return {
                ...state,
                article: addCommentArticle(state.article, action.comment),
            };
        case "ADD_NEW_IDEA_COMMENT":
            return {
                ...state,
                idea: addCommentIdea(state.idea, action.commentData),
            };
        default:
            return state;
    }
};
export default viewReducer;
