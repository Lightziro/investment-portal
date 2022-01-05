import {
    ArticleComment,
    ArticleView,
} from "../../ts/types/state/article.types";
import {
    IdeaComment,
    InvestmentIdeaView,
} from "../../ts/types/redux/store.types";
import { initialArticleView } from "../../ts/init/entity/article.init";
import { initialIdeaView } from "../../ts/init/entity/idea.init";
import { initialProfile } from "../../ts/init/entity/user.init";

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
export const initialByEntity = {
    profile: initialProfile,
    article: initialArticleView,
    idea: initialIdeaView,
};
