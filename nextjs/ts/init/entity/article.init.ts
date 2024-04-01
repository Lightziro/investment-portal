import { FormArticle } from "../../types/forms/form.types";
import { ArticleView } from "../../../redux/ts/types/view/view-store.types";

export const initialArticleView: ArticleView = {
    content: null,
    labels: null,
    comments: null,
    emotions: null,
};
export const initialArticleForm: FormArticle = {
    title: "",
    content: "",
    preview_path: null,
    sendNotice: false,
};

