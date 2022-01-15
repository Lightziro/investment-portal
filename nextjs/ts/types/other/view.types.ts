import { InvestmentIdeaView } from "../redux/store.types";
import { ArticleView } from "../entity/article.types";

export type EntityName = "article" | "idea" | "profile";
export type typeView = InvestmentIdeaView | ArticleView;

export interface Comment {
    commentId: number;
    userId: number;
    date: string;
    fullNameAuthor: string;
    comment: string;
    avatar: string;
}
