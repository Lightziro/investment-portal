import {
    CompanyIdeaInfo,
    EpsCompanyStats,
    News,
} from "../state/stock-market.types";

export interface MainStore {
    user: User;
    news: News[];
    investmentData: InvestmentData;
    ideaView: InvestmentIdeaView;
}

export interface InvestmentIdeaView {
    epsStats: EpsCompanyStats[] | null;
    analyticsStats: { buy: number; sell: number; hold: number }[];
    companyInfo: CompanyIdeaInfo;
    ideaInfo: {
        isShort: boolean;
        priceBuy: number;
        priceSell: number;
    };
}

export interface InvestmentData {
    bestProfit: number | null;
    worseProfit: number | null;
    actualIdeas: InvestmentIdea[];
}

export interface InvestmentIdea {
    id: number;
    possibleProfit: number;
    stock: string;
}

export interface AdminStore {
    investmentIdeas: {
        viewToday: null | number;
        likedToday: null | number;
    };
}

export interface User {
    userName: string;
    firstName: string;
    secondName: string;
    role: string;
    notices: Notice[];
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
}
