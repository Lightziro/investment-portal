import { AdminSection, DtoItems } from "../ts/types/admin/admin-store.types";
import {
    AdminUsers,
    AdminUsersStats,
} from "../ts/types/admin/users/admin-users.types";
import { ProfileView } from "../../ts/types/redux/store.types";
import {
    AdminEntity,
    AdminSection as SectionEnum,
} from "../ts/enums/admin/admin.enum";

export const setUsersStats = (
    state: AdminUsers,
    userStats: AdminUsersStats
): AdminUsers => ({
    ...state,
    stats: userStats,
});
export const setUsersList = (
    state: AdminUsers,
    users: { items: ProfileView[]; lastPage: number }
): AdminUsers => ({
    ...state,
    list: users.items,
    lastPage: users.lastPage,
});
export const setEntityList = (
    state: AdminSection,
    data: DtoItems
): AdminSection => ({
    ...state,
    list: data.items,
    lastPage: data.lastPage,
    loading: false,
});
export const getSectionByEntity = (entity: AdminEntity): SectionEnum => {
    switch (entity) {
        case AdminEntity.User:
            return SectionEnum.Users;
        case AdminEntity.Article:
            return SectionEnum.Articles;
        case AdminEntity.InvestmentIdea:
            return SectionEnum.InvestmentIdeas;
    }
};
