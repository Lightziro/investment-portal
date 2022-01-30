import {
    IdeaRatingStats,
    UserIdeaRating,
} from "../../../../redux/ts/types/view/view-store.types";

export interface DtoIdeaRatingStats {
    ratings: IdeaRatingStats;
    userRating: UserIdeaRating;
}
