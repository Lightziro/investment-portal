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
} from "../../../../modules/admin/ts/types/response/admin-response-item.types";
import { AdminCompanies } from "./companies/admin-companies.types";
import { UserModel } from "../../../../ts/types/entity/user.types";
import { CompanyModel } from "../../../../ts/types/entity/other.types";

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
    companies: AdminCompanies;
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

export type AdminItems =
    | DtoArticleItem[]
    | DtoIdeaItem[]
    | UserModel[]
    | CompanyModel[];

export type AdminSection =
    | AdminUsers
    | AdminIdeas
    | AdminArticle
    | AdminCompanies;
