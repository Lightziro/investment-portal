import { AdminSectionBase } from "../admin-store.types";
import { CompanyModel } from "../../../../../ts/types/entity/other.types";

export interface AdminCompanies extends AdminSectionBase {
    list: CompanyModel[];
}
