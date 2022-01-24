import { FormEditUserAdmin } from "../../../ts/types/forms/form.types";
import { UserAdminEdit } from "../../../ts/types/entity/user.types";
import { IdeaPublishForm } from "../ts/types/forms/admin-idea-forms";
import { DtoPersonalIdea } from "../ts/types/response/admin-response-personal";
import moment from "moment";

export const convertFormEditUser = (
    user: UserAdminEdit
): FormEditUserAdmin => ({
    lastName: user.name.lastName,
    firstName: user.name.firstName,
    country: user.country.country_id,
    sex: user.sex,
    role: user.roleId,
});
export const convertFormPublishIdea = (
    dto: DtoPersonalIdea
): IdeaPublishForm => ({
    price_buy: dto.price_buy,
    price_sell: dto.price_sell,
    date_end: moment().add(3, "months").format("YYYY/MM/DD"),
    is_short: false,
    send_email: false,
});
