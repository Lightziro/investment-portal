export const setViewEntity = (
    data: any,
    entity: "article" | "idea" | "profile"
) => ({
    type: "SET_VIEW_ENTITY",
    data,
    entity,
});
