import { CreateIdea, ViewStore } from "../../types/redux/store.types";
import { initialArticleView } from "../entity/article.init";
import { initialIdeaView } from "../entity/idea.init";
import { initialProfile } from "../entity/user.init";

export const initialViewStore: ViewStore = {
    profile: initialProfile,
    idea: initialIdeaView,
    article: initialArticleView,
};
export const initialCreateIdeaStore: CreateIdea = {
    companies: [],
    loadInput: false,
    selectedCompany: null,
    stage: 1,
};
