import {
    ArticleComment,
    ArticleView,
} from "../../ts/types/state/article.types";
import {
    IdeaComment,
    InvestmentIdeaView,
} from "../../ts/types/redux/store.types";

export const addCommentArticle = (
    state: ArticleView,
    comment: ArticleComment
): ArticleView => {
    return {
        ...state,
        comments: [comment, ...state.comments],
        labels: state.labels.map((label) => {
            if (label.icon === "bx:bxs-comment-detail") {
                label.text = Number(label.text) + 1;
            }
            return label;
        }),
    };
};
export const addCommentIdea = (
    state: InvestmentIdeaView,
    comment: IdeaComment
): InvestmentIdeaView => {
    return {
        ...state,
        comments: [comment, ...state.comments],
    };
};
