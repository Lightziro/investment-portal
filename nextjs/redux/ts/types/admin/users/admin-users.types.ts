import { AdminSectionBase } from "../admin-store.types";
import { UserModel } from "../../../../../ts/types/entity/user.types";

export interface AdminUsers extends AdminSectionBase {
    list: UserModel[];
}
