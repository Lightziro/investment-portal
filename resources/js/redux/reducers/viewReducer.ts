import { ViewStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import { initialByEntity } from "../../utils/article.utils";

const viewReducer = (
    state: ViewStore = initialViewStore,
    action: AnyAction
): ViewStore => {
    switch (action.type) {
        case "SET_ARTICLE_DATA":
            return { ...state, article: action.data };
        case "CLEAR_VIEW":
            return {
                ...state,
                [action.entity]: initialByEntity[action.entity],
            };
        default:
            return state;
    }
};
export default viewReducer;
