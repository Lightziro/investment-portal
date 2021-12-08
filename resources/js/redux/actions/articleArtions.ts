import { FormArticle } from "../../ts/types/forms/form.types";

export const createArticle = (articleForm: FormArticle) => ({
    type: "CREATE_ARTICLE",
    articleForm,
});
export const updateArticle = (articleForm: FormArticle) => ({
    type: "UPDATE_ARTICLE",
    articleForm,
});
export const fetchArticlesForAdmin = (page: number) => ({
    type: "FETCH_ARTICLE_FOR_ADMIN",
    page,
});
export const fetchArticleView = (articleId: number) => ({
    type: "FETCH_ARTICLE_VIEW",
    articleId,
});
export const createArticleComment = (articleId: number, comment: string) => ({
    type: "CREATE_ARTICLE_COMMENT",
    commentData: { articleId, comment },
});
export const editArticle = (articleId: number) => ({
    type: "SET_EDIT_ARTICLE",
    articleId,
});
export const deleteArticle = (articleId: number, page: number) => ({
    type: "DELETE_ARTICLE",
    articleId,
    page,
});
