import {
    IdeaRatingStats,
    UserIdeaRating,
} from "../../../../redux/ts/types/view/view-store.types";
import {
    AnalyticsStats,
    EpsCompanyStats,
} from "../../../../ts/types/entity/stock-market.types";

export interface DtoIdeaRatingStats {
    ratings: IdeaRatingStats;
    userRating: UserIdeaRating;
}

export interface DtoCompanyStats {
    analyticsStats: EpsCompanyStats[] | null;
    epsStats: AnalyticsStats[] | null;
}
