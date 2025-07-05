export interface CountryModel {
    country_id: number;
    code: string;
    name: string;
}

export interface CompanyModel {
    company_id: number;
    ticker: string;
    name: string;
    logo_path: string | null;
    currency: string;
    date_ipo: string;
    last_price: number;
    change_percent_today: number;
    show_top: boolean;
    activity?: CompanyActivityModel | null;
}
export interface CompanyActivityModel {
    activity_id: number;
    name: string;
}

export interface CompanyQuote {
    value_change: number;
    value_change_percent: number;
    value_last: number;
}
