import { CompanyModel, CountryModel } from "./other.types";

export interface UserModel {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    role_id: number;
    country_id: number;
    updated_at: string;
    created_at: string;
    avatar_path: string;
    sex?: string;
    full_name: string;
    role?: RoleModel;
    country?: CountryModel;
}
export interface RoleModel {
    role_id: number;
    name: string;
}

export interface AuthorInfo {
    totalIdeas: number;
    amountSuccessfulIdeas: number;
    amountFailIdeas: number;
    fullName: string;
    userId: number;
    avatar: string;
}
export interface UserPredict {
    prediction_id: number;
    company: CompanyModel;
    user_id: number;
    current_price?: number | null;
    price: number;
    is_top: boolean;
    amount: number;
    company_id: number;
}
export interface UserNoticeModel {
    notice_id: number;
    created_at: string;
    description: string;
    title: string;
    updated_at: string;
    user_id: number;
    user?: UserModel;
    viewed: boolean;
}
