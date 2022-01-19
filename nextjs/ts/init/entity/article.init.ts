import { ArticleView } from "../../types/entity/article.types";
import { FormArticle } from "../../types/forms/form.types";

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
