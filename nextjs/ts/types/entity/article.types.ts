import { UserModel } from "./user.types";
import { Comment } from "../other/view.types";

export interface ArticleModel {
    article_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    preview_path: string;
    author_id: number;
    content: string;
    author?: UserModel;
}

export interface ArticleLabel {
    icon: string;
    text: string | number;
}
