export interface CountryModel {
    country_id: number | string;
    code: string;
    name: string;
}

export interface CompanyModel {
    company_id: number;
    ticker: string;
    name: string;
    logo: string | null;
    currency: string;
    date_ipo: string;
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
