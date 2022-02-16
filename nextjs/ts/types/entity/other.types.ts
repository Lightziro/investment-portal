export interface CountryModel {
    country_id: number;
    code: string;
    name: string;
}

export interface CompanyModel {
    company_id: number;
    ticker: string;
    name: string;
    logo: string | null;
    date_ipo: string;
}
