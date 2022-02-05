import { Comment } from "../other/view.types";
import { UserModel } from "./user.types";

export interface ArticleModel {
    article_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    preview_path: string;
    author_id: number;
    author: UserModel;
    content: string;
    // TODO: добавить комментарии
}

export interface ArticleLabel {
    icon: string;
    text: string | number;
}
