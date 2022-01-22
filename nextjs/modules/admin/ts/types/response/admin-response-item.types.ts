import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";

export interface DtoIdeaItem {
    idea_id: number;
    company: {
        name: string;
        logo: string;
    };
    views: number;
    comments: number;
    status: IdeaStatus;
    score: number;
}
export interface DtoUserItem {
    user_id: number;
    full_name: string;
    country: string;
    sex: string;
    role: string;
    created_at: string;
    updated_at: string;
}
export interface DtoArticleItem {
    article_id: number;
    content: string;
    title: string;
    author: {
        full_name: string;
        avatar_path: string;
    };
    created_at: string;
}
