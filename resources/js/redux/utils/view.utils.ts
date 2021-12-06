import {
    ArticleComment,
    ArticleView,
} from "../../ts/types/state/article.types";
import {
    IdeaComment,
    InvestmentIdeaView,
} from "../../ts/types/redux/store.types";

export const addComment = (
    state: ArticleView | InvestmentIdeaView,
    comment: ArticleComment | IdeaComment
): any => {
    return {
        ...state,
        comments: [comment, ...state.comments],
    };
};
