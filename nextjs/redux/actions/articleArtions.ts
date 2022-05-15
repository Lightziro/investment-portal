export const fetchArticleComments = (articleId: number) => ({
    type: "FETCH_ARTICLE_COMMENTS",
    articleId,
});
export const fetchArticleLabels = (articleId: number) => ({
    type: "FETCH_ARTICLE_LABELS",
    articleId,
});
export const fetchArticleEmotions = (articleId: number) => ({
    type: "FETCH_ARTICLE_EMOTIONS",
    articleId,
});
export const createEmotion = (articleId: number, emotionCode: string) => ({
    type: "SEND_CREATE_EMOTION",
    articleId,
    emotionCode,
});
export const changeEmotion = (
    articleId: number,
    emotionId: number,
    emotionCode: string
) => ({
    type: "SEND_CHANGE_EMOTION",
    articleId,
    emotionId,
    emotionCode,
});
