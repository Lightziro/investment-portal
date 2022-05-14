import {DtoArticlesStats, DtoIdeasStats} from "../types/response/response-stats";

export const initIdeasStats: DtoIdeasStats = {
    ideas_create_week: null,
    ideas_create_today: null,
    ideas_view_week: null,
    ideas_view_today: null,
};

export const initArticlesStats: DtoArticlesStats = {
    articles_create_week: 15,
    articles_create_today: 0,
    articles_view_today: 0,
    articles_view_week: 13,
};
