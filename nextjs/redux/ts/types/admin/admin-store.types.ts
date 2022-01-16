import {
    CreateIdea,
    NewsPrediction,
} from "../../../../ts/types/redux/store.types";
import { AdminUsers } from "./users/admin-users.types";
import { AdminArticle } from "./articles/admin-articles.types";

export interface AdminStore {
    investmentIdeas: {
        viewToday: number;
        commentsToday: number;
    };
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
