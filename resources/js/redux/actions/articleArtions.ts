import { FormArticle } from "../../ts/types/forms/form.types";

export const createArticle = (articleForm: FormArticle) => ({
    type: "CREATE_ARTICLE",
    articleForm,
});
export const fetchArticlesForAdmin = (page: number) => ({
    type: "FETCH_ARTICLE_FOR_ADMIN",
    page,
});
