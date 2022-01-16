import { ProfileView } from "../redux/store.types";

export interface AuthorInfo {
    totalIdeas: number;
    amountSuccessfulIdeas: number;
    amountFailIdeas: number;
    fullName: string;
    userId: number;
    avatar: string;
}
export interface UserAdminEdit extends ProfileView {
    roleId: number;
}
export interface Role {
    roleId: number;
    name: string;
}
