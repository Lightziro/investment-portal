import { AdminSectionBase } from "../admin-store.types";
import { DtoArticleItem } from "../../../../../modules/admin/ts/types/response/admin-response-item.types";

export interface AdminArticle extends AdminSectionBase {
    list: DtoArticleItem[];
    dialog: boolean;
    edit: DtoArticleItem; // TODO: FIX TYPE
}
