import { ViewStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import { initialByEntity } from "../../utils/article.utils";
import { addCommentArticle } from "../utils/view.utils";

const viewReducer = (
    state: ViewStore = initialViewStore,
    action: AnyAction
): ViewStore => {
    switch (action.type) {
        case "SET_ENTITY_DATA":
            return { ...state, [action.entity]: action.data };
        case "CLEAR_VIEW":
            return {
                ...state,
                [action.entity]: initialByEntity[action.entity],
            };
        case "ADD_NEW_ARTICLE_COMMENT":
            console.log("TUT");
            return {
                ...state,
                article: addCommentArticle(state.article, action.comment),
            };
        default:
            return state;
    }
};
export default viewReducer;
