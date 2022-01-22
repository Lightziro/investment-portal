import {
    CreateIdea,
    NewsPrediction,
} from "../../../../ts/types/redux/store.types";
import { AdminUsers } from "./users/admin-users.types";
import { AdminArticle } from "./articles/admin-articles.types";
import { AdminIdeas } from "./investment-ideas/admin-ideas.types";
import {
    DtoArticleItem,
    DtoIdeaItem,
    DtoUserItem,
} from "../../../../modules/admin/ts/types/response/admin-response-item.types";

export interface AdminStore {
    investmentIdeas: AdminIdeas;
    smartAnalytic: {
        score: {
            classificationNews: number;
        };
        newsForAnalyze: NewsPrediction[];
    };
    articles: AdminArticle;
    createIdea: CreateIdea;
    users: AdminUsers;
}
export interface DtoItems {
    items: AdminItems;
    lastPage: number;
}
export interface AdminSectionBase {
    list: AdminItems;
    lastPage: number;
    loading: boolean;
}
export type AdminItems = DtoArticleItem[] | DtoIdeaItem[] | DtoUserItem[];
export type AdminSection = AdminUsers | AdminIdeas | AdminArticle;
