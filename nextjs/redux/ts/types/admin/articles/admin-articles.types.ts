import { Article } from "../../../../../ts/types/entity/article.types";
import { AdminSectionBase } from "../admin-store.types";

export interface AdminArticle extends AdminSectionBase {
    dialog: boolean;
    edit: Article;
}
