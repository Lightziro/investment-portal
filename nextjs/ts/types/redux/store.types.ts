import { InvestmentIdea } from "../entity/stock-market.types";
import { AlertColor } from "@mui/material";
import { AdminStore } from "../../../redux/ts/types/admin/admin-store.types";
import { CreateIdeaStage } from "../../enums/investment-idea.enum";
import { ViewStore } from "../../../redux/ts/types/view/view-store.types";

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
    user_id: number;
    first_name: string;
    last_name: string;
    full_name: string;
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
