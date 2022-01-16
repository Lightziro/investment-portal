import { Article } from "../../../../../ts/types/entity/article.types";

export interface AdminArticle {
    list: Article[];
    lastPage: number;
    loading: boolean;
    dialog: boolean;
    edit: Article;
}
