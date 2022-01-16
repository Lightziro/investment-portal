import { FormEditUserAdmin } from "../../../ts/types/forms/form.types";
import { UserAdminEdit } from "../../../ts/types/entity/user.types";

export const convertFormEditUser = (
    user: UserAdminEdit
): FormEditUserAdmin => ({
    lastName: user.name.lastName,
    firstName: user.name.firstName,
    country: user.country.country_id,
    sex: user.sex,
    role: user.roleId,
});
