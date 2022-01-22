import { InvestmentIdeaItemAdmin } from "../../../redux/ts/types/admin/investment-ideas/admin-ideas.types";
import { IdeaStatus } from "../../../ts/enums/investment-idea.enum";

export const getIdeaStatsText = (
    attrStats: string,
    idea: InvestmentIdeaItemAdmin
) => {
    return idea[attrStats] === 0 &&
        [IdeaStatus.Created, IdeaStatus.Analyzed].includes(idea.status)
        ? "Wait published"
        : idea[attrStats];
};
