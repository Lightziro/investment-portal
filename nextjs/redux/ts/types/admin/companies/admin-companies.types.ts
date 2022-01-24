import { AdminSectionBase } from "../admin-store.types";
import { DtoCompanyItem } from "../../../../../modules/admin/ts/types/response/admin-response-item.types";

export interface AdminCompanies extends AdminSectionBase {
    list: DtoCompanyItem[];
}
