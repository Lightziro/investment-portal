import { EntityName } from "../../ts/types/other/view.types";

export const setViewEntity = (data: any, entity: EntityName) => ({
    type: "SET_VIEW_ENTITY",
    data,
    entity,
});
export const createEntityComment = (
    entityId: number,
    entityType: EntityName,
    text: string
) => ({
    type: "CREATE_ENTITY_COMMENT",
    entityId,
    entityType,
    text,
});
