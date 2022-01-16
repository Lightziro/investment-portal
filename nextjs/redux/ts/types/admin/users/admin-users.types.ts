import { ProfileView } from "../../../../../ts/types/redux/store.types";

export interface AdminUsers {
    stats: AdminUsersStats;
    list: ProfileView[];
    lastPage: number;
}

export interface AdminUsersStats {
    newUsersToday: number;
    newUsersWeek: number;
}
