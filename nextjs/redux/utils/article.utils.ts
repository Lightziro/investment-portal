import { AdminArticle } from "../../ts/types/redux/store.types";
import { Article } from "../../ts/types/entity/article.types";

export const setEditArticle = (
    store: AdminArticle,
    editId: number
): AdminArticle => ({
    ...store,
    dialog: true,
    edit: store.list.find((article) => article.articleId === editId),
});
export const replaceUpdateArticle = (
    store: AdminArticle,
    updateArticle: Article
): AdminArticle => ({
    ...store,
    list: store.list.map((item) => {
        if (item.articleId === updateArticle.articleId) {
            item = updateArticle;
        }
        return item;
    }),
    dialog: false,
    edit: null,
});
