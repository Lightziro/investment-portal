import { CompanyIdeaInfo } from "../../../ts/types/state/stock-market.types";

const getTitleIdea = (companyInfo: CompanyIdeaInfo): string => {
    if (companyInfo) {
        return companyInfo.companyName;
    }
    return "";
};
export default getTitleIdea;
