import { FormArticle } from "../../types/forms/form.types";
import { ArticleView } from "../../../redux/ts/types/view/view-store.types";

export const initialArticleView: ArticleView = {
    articleId: null,
    content: null,
    preview: null,
    dateCreate: null,
    dateUpdate: null,
    author: null,
    title: null,
    labels: null,
    comments: null,
};
export const initialArticleForm: FormArticle = {
    title: "",
    content: "",
    preview: null,
    sendNotice: false,
};
