import {
    IdeaComment,
    InvestmentIdeaView,
} from "../../ts/types/redux/store.types";

export const addComment = (
    state: InvestmentIdeaView,
    comment: IdeaComment
): InvestmentIdeaView => {
    return {
        ...state,
        comments: [comment, ...state.comments],
    };
};
