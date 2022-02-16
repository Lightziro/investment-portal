export interface News {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

export interface EpsCompanyStats {
    date: string;
    value: number;
}

export interface IdeaInfo {
    isShort: boolean;
    priceBuy: number;
    priceSell: number;
    dateStart: string;
    dateEnd: string;
}

export interface AnalyticsStats {
    period: string;
    buy: number;
    hold: number;
    sell: number;
}

export interface InvestmentIdea {
    id: number;
    possibleProfit: number;
    stock: string;
    logo: string;
}
