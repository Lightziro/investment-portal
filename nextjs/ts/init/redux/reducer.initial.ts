import { CreateIdea } from "../../types/redux/store.types";
import { initialArticleView } from "../entity/article.init";
import { initialIdeaView } from "../entity/idea.init";
import { CreateIdeaStage } from "../../enums/investment-idea.enum";
import { ViewStore } from "../../../redux/ts/types/view/view-store.types";
import { PersonalAccountStore } from "../../../redux/ts/types/personal-account/personal-account-store.type";
import { initialCompanyView } from "../entity/company.init";

export const initialViewStore: ViewStore = {
    idea: initialIdeaView,
    article: initialArticleView,
    company: initialCompanyView,
};
export const initialCreateIdeaStore: CreateIdea = {
    companies: [],
    loadInput: false,
    selectedCompany: null,
    stage: CreateIdeaStage.SelectCompany,
};
export const initialAccountStore: PersonalAccountStore = {
    predictions: {
        list: [],
        loading: true,
    },
    notices: {
        list: [],
        loading: true,
    },
};
