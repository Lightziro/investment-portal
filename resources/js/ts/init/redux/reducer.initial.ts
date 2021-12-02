import { ViewStore } from "../../types/redux/store.types";
import { initialArticleView } from "../entity/article.init";

export const initialViewStore: ViewStore = {
    profile: null,
    idea: null,
    article: initialArticleView,
};
