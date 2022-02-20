import {
    ArticleView,
    CompanyView,
    InvestmentIdeaView,
} from "../../../redux/ts/types/view/view-store.types";
import { UserModel } from "../entity/user.types";

export type EntityName = "article" | "idea" | "profile" | "company";
export type typeView = InvestmentIdeaView | ArticleView | CompanyView;

export interface ProfileUser extends UserModel {
    count_comments: number;
}

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
