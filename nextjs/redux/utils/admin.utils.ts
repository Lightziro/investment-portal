import { AdminStore } from "../ts/types/admin/admin-store.types";
import {
    AdminUsers,
    AdminUsersStats,
} from "../ts/types/admin/users/admin-users.types";
import { ProfileView } from "../../ts/types/redux/store.types";

export const setUsersStats = (
    state: AdminUsers,
    userStats: AdminUsersStats
): AdminUsers => ({
    ...state,
    stats: userStats,
});
export const setUsersList = (
    state: AdminUsers,
    users: { items: ProfileView[]; lastPage: number }
): AdminUsers => ({
    ...state,
    list: users.items,
    lastPage: users.lastPage,
});
