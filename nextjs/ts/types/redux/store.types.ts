import { InvestmentIdea } from "../entity/stock-market.types";
import { AlertColor } from "@mui/material";
import { AdminStore } from "../../../redux/ts/types/admin/admin-store.types";
import { CreateIdeaStage } from "../../enums/investment-idea.enum";
import { ViewStore } from "../../../redux/ts/types/view/view-store.types";
import { PersonalAccountStore } from "../../../redux/ts/types/personal-account/personal-account-store.type";
import { UserNoticeModel, UserPredict } from "../entity/user.types";

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
// TODO: СДЕЛАТЬ ОБЫЧНЫМ
export interface UserStore {
    data: UserData;
    fetch: boolean;
}
export interface UserData {
    user_id: number;
    first_name: string;
    last_name: string;
    balance: number | null;
    full_name: string;
    role: string;
    notices: UserNoticeModel[];
    predictions: UserPredict[];
    avatar: string;
}
export interface SheetStore {
    isOpenSheet: boolean;
    sheetType: string;
    propsSheet: any;
}

export interface StoreData {
    admin: AdminStore;
    alert: AlertStore;
    view: ViewStore;
    user: UserStore;
    account: PersonalAccountStore;
    sheet: SheetStore;
}

export interface CreateIdea {
    companies: [];
    stage: CreateIdeaStage;
    selectedCompany: string;
    loadInput: boolean;
}
