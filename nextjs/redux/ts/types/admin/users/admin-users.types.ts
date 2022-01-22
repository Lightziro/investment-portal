import { AdminSectionBase } from "../admin-store.types";

export interface AdminUsers extends AdminSectionBase {
    stats: AdminUsersStats;
}

export interface AdminUsersStats {
    newUsersToday: number;
    newUsersWeek: number;
}
