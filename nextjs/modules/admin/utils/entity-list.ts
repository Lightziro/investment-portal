import { IdeaStatus } from "../../../ts/enums/investment-idea.enum";
import { DtoIdeaItem } from "../ts/types/response/admin-response-item.types";

export const getIdeaStatsText = (attrStats: string, idea: DtoIdeaItem) => {
    return idea[attrStats] === 0 &&
        [IdeaStatus.Created, IdeaStatus.Analyzed].includes(idea.status)
        ? "Wait published"
        : idea[attrStats];
};
