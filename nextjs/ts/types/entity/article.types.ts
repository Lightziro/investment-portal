import { Comment } from "../other/view.types";

export interface Article {
    articleId: number;
    title: string;
    dateCreate: string;
    dateUpdate: string;
    preview: string;
    author: ArticleAuthor;
    content: string;
}

export interface ArticleAuthor {
    userId: number;
    avatar: string;
    fullName: string;
}

export interface ArticleLabel {
    icon: string;
    text: string | number;
}
