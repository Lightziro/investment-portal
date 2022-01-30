import { AdminSection, DtoItems } from "../ts/types/admin/admin-store.types";
import {
    AdminUsers,
    AdminUsersStats,
} from "../ts/types/admin/users/admin-users.types";
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
export const setEntityList = (state: AdminSection, data: DtoItems): any => ({
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
        case AdminEntity.Company:
            return SectionEnum.Companies;
    }
};