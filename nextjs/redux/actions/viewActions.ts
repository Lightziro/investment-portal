import { EntityName } from "../../ts/types/other/view.types";
import { DtoIdeaRatingStats } from "../../modules/investment-idea/ts/types/response.types";
import {Entity} from "../../ts/enums/other.enums";

export const setViewEntity = (data: any, entity: EntityName) => ({
    type: "SET_VIEW_ENTITY",
    data,
    entity,
});
export const createEntityComment = (
    entityId: number,
    entityType: Entity,
    text: string
) => ({
    type: "CREATE_ENTITY_COMMENT",
    entityId,
    entityType,
    text,
});

export const setIdeaRatingStats = (data: DtoIdeaRatingStats) => ({
    type: "CREATE_IDEA_RATING",
    data,
});
export const clearView = (entity: EntityName) => ({
    type: "CLEAR_VIEW",
    entity,
});
