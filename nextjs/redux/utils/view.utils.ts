import { ArticleView } from "../../ts/types/entity/article.types";
import { InvestmentIdeaView } from "../../ts/types/redux/store.types";
import { initialArticleView } from "../../ts/init/entity/article.init";
import { initialIdeaView } from "../../ts/init/entity/idea.init";
import { initialProfile } from "../../ts/init/entity/user.init";
import { Comment, typeView } from "../../ts/types/other/view.types";

export const addCommentEntity = (
    state: typeView,
    comment: Comment
): typeView => {
    const newState = {
        ...state,
        comments: [comment, ...state.comments],
    };
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
export const initialByEntity = {
    profile: initialProfile,
    article: initialArticleView,
    idea: initialIdeaView,
};
