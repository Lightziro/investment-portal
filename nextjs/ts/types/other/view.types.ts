import { InvestmentIdeaView } from "../redux/store.types";
import { ArticleView } from "../entity/article.types";

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
