import { ViewStore } from "../../types/redux/store.types";
import { initialArticleView } from "../entity/article.init";
import { initialIdeaView } from "../entity/idea.init";

export const initialViewStore: ViewStore = {
    profile: null,
    idea: initialIdeaView,
    article: initialArticleView,
};
export const initialUser = {
    userId: null,
    fullName: null,
    role: null,
    notices: [],
    avatar: null,
};
