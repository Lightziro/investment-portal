export const fetchUsersStats = () => ({
    type: "FETCH_USERS_STATS",
});
export const fetchUsersByPage = (page: number) => ({
    type: "FETCH_USERS_BY_PAGE",
    page,
});
