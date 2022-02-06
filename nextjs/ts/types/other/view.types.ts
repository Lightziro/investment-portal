import {
    ArticleView,
    InvestmentIdeaView,
} from "../../../redux/ts/types/view/view-store.types";
import {UserModel} from "../entity/user.types";

export type EntityName = "article" | "idea" | "profile";
export type typeView = InvestmentIdeaView | ArticleView;

export interface Comment {
    comment_id: number;
    user_id: number;
    created_at: string;
    user?: UserModel;
    comment: string;
}
export interface RatingScore {
    score: number;
    count: number;
}
