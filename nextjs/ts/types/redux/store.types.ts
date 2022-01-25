import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
    InvestmentIdea,
} from "../entity/stock-market.types";
import { AuthorInfo } from "../entity/user.types";
import { AlertColor } from "@mui/material";
import { CountryItem } from "../other/other.types";
import { AdminStore } from "../../../redux/ts/types/admin/admin-store.types";
import { MainStore } from "../../../redux/ts/types/main/main-store.types";
import { CreateIdeaStage } from "../../enums/investment-idea.enum";
import { Comment } from "../other/view.types";
import { ViewStore } from "../../../redux/ts/types/view/view-store.types";

export interface OtherData {
    countries: CountryItem[];
}

export interface AlertStore {
    message: string;
    status: AlertColor;
    state: boolean;
}

export interface InvestmentData {
    bestProfit: number | null;
    worseProfit: number | null;
    investmentIdeas: InvestmentIdea[];
    ideaStatistics: IdeaStatistics;
}
export interface IdeaStatistics {
    success: number;
    fail: number;
}

export interface NewsPrediction {
    id: number;
    title: string;
    prediction: string;
}

export interface UserStore {
    userId: number;
    fullName: string;
    role: string;
    notices: Notice[];
    avatar: string;
}

export interface Notice {
    id: number;
    title: string;
    description: string;
    viewed: boolean;
    created: string;
}

export interface StoreData {
    main: MainStore;
    admin: AdminStore;
    alert: AlertStore;
    view: ViewStore;
    user: UserStore;
}

export interface CreateIdea {
    companies: [];
    stage: CreateIdeaStage;
    selectedCompany: string;
    loadInput: boolean;
}
