import { CreateIdea } from "../../types/redux/store.types";
import { initialArticleView } from "../entity/article.init";
import { initialIdeaView } from "../entity/idea.init";
import { initialProfile } from "../entity/user.init";
import { CreateIdeaStage } from "../../enums/investment-idea.enum";
import { ViewStore } from "../../../redux/ts/types/view/view-store.types";
import { PersonalAccountStore } from "../../../redux/ts/types/personal-account/personal-account-store.type";

export const initialViewStore: ViewStore = {
    profile: initialProfile,
    idea: initialIdeaView,
    article: initialArticleView,
};
export const initialCreateIdeaStore: CreateIdea = {
    companies: [],
    loadInput: false,
    selectedCompany: null,
    stage: CreateIdeaStage.SelectCompany,
};
export const initialAccountStore: PersonalAccountStore = {
    predictions: null,
};
