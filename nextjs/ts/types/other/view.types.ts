import {
    ArticleView,
    InvestmentIdeaView,
} from "../../../redux/ts/types/view/view-store.types";

export type EntityName = "article" | "idea" | "profile";
export type typeView = InvestmentIdeaView | ArticleView;

export interface Comment {
    comment_id: number;
    user_id: number;
    created_at: string;
    full_name: string;
    comment: string;
    avatar_path: string;
}
export interface RatingScore {
    score: number;
    count: number;
}
