import { AdminSection, DtoItems } from "../ts/types/admin/admin-store.types";
import { AdminUsers } from "../ts/types/admin/users/admin-users.types";
import { Entity, Section } from "../../ts/enums/other.enums";

export const setEntityList = (state: AdminSection, data: DtoItems): any => ({
    ...state,
    list: data.items,
    lastPage: data.lastPage,
    loading: false,
});
export const getSectionByEntity = (entity: Entity): Section => {
    switch (entity) {
        case Entity.User:
            return Section.Users;
        case Entity.Article:
            return Section.Articles;
        case Entity.InvestmentIdea:
            return Section.InvestmentIdeas;
        case Entity.Company:
            return Section.Companies;
    }
};
