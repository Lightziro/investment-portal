import {
    CreateIdea,
    NewsPrediction,
    ProfileView,
} from "../../../../ts/types/redux/store.types";
import { AdminUsers } from "./users/admin-users.types";
import { AdminArticle } from "./articles/admin-articles.types";
import {
    AdminIdeas,
    InvestmentIdeaItemAdmin,
} from "./investment-ideas/admin-ideas.types";
import { Article } from "../../../../ts/types/entity/article.types";

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
export type AdminItems = ProfileView[] | Article[] | InvestmentIdeaItemAdmin[];
export type AdminSection = AdminUsers | AdminIdeas | AdminArticle;
