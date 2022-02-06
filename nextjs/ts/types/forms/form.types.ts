export interface FormProfile {
    user_id: number;
    first_name: string;
    last_name: string;
    country_id: number;
    sex: string;
}
export interface FormArticle {
    title: string;
    content: string;
    sendNotice: boolean;
    preview_path: File;
}
export interface FormParamsAnalyze {
    monthPeriod: number;
}
