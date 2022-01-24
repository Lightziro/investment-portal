import { AdminSectionBase } from "../admin-store.types";
import { DtoUserItem } from "../../../../../modules/admin/ts/types/response/admin-response-item.types";

export interface AdminUsers extends AdminSectionBase {
    list: DtoUserItem[];
    stats: AdminUsersStats;
}

export interface AdminUsersStats {
    newUsersToday: number;
    newUsersWeek: number;
}
