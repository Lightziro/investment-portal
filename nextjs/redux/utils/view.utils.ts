import { initialArticleView } from "../../ts/init/entity/article.init";
import { initialIdeaView } from "../../ts/init/entity/idea.init";
import { initialProfile } from "../../ts/init/entity/user.init";
import {
    Comment,
    RatingScore,
    typeView,
} from "../../ts/types/other/view.types";
import { UserIdeaRating, ViewStore } from "../ts/types/view/view-store.types";
import {
    DtoCompanyStats,
    DtoIdeaRatingStats,
} from "../../modules/investment-idea/ts/types/response.types";
import { ArticleLabel } from "../../ts/types/entity/article.types";
import { CompanyQuote } from "../../ts/types/entity/other.types";
import { initialCompanyView } from "../../ts/init/entity/company.init";

export const addCommentEntity = (state: any, comment: Comment): typeView => {
    const newState = {
        ...state,
        comments: [comment, ...state.comments],
    };
    console.log(newState);
    if (state.hasOwnProperty("labels")) {
        newState.labels = state.labels.map((label) => {
            if (label.icon === "bx:bxs-comment-detail") {
                label.text = Number(label.text) + 1;
            }
            return label;
        });
    }
    return newState;
};
export const setIdeaUserRating = (
    state: ViewStore,
    data: UserIdeaRating | null
): ViewStore => ({
    ...state,
    idea: { ...state.idea, userRating: data },
});
export const createIdeaRating = (
    state: ViewStore,
    data: DtoIdeaRatingStats
): ViewStore => ({
    ...state,
    idea: { ...state.idea, ...data },
});
export const initialByEntity = {
    profile: initialProfile,
    article: initialArticleView,
    idea: initialIdeaView,
    company: initialCompanyView,
};
export const setEntityComments = (
    state: ViewStore,
    entity: string,
    comments: Comment[]
): ViewStore => ({
    ...state,
    [entity]: { ...state[entity], comments },
});
export const setIdeaRating = (
    state: ViewStore,
    ratings: RatingScore
): ViewStore => ({
    ...state,
    idea: { ...state.idea, ratings },
});
export const setCompanyStats = (
    state: ViewStore,
    data: DtoCompanyStats,
    entity: "company" | "idea"
): ViewStore => ({
    ...state,
    [entity]: { ...state.idea, ...data },
});
export const setArticleLabels = (
    state: ViewStore,
    data: ArticleLabel[]
): ViewStore => ({
    ...state,
    article: { ...state.article, labels: data },
});
export const setIdeaQuote = (
    state: ViewStore,
    data: CompanyQuote
): ViewStore => ({
    ...state,
    idea: { ...state.idea, quote: data },
});
