import { AdminArticle } from "../ts/types/admin/articles/admin-articles.types";
import { DtoArticleItem } from "../../modules/admin/ts/types/response/admin-response-item.types";

export const setEditArticle = (
    store: AdminArticle,
    editId: number
): AdminArticle => ({
    ...store,
    dialog: true,
    edit: store.list.find((article) => article.article_id === editId),
});
export const replaceUpdateArticle = (
    store: AdminArticle,
    updateArticle: DtoArticleItem // TODO: FIX TYPE
): AdminArticle => ({
    ...store,
    list: store.list.map((item) => {
        if (item.article_id === updateArticle.article_id) {
            item = updateArticle;
        }
        return item;
    }),
    dialog: false,
    edit: null,
});
