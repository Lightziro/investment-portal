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
