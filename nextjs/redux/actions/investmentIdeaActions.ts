export const createComment = (ideaId: number, text: string) => ({
    type: "CREATE_IDEA_COMMENT",
    commentData: { ideaId, text },
});
export const fetchIdeaComments = (ideaId: number) => ({
    type: "FETCH_IDEA_COMMENTS",
    ideaId,
});
export const fetchIdeaRating = (ideaId: number) => ({
    type: "FETCH_IDEA_RATING",
    ideaId,
});
export const fetchUserIdeaRating = (ideaId: number) => ({
    type: "FETCH_USER_IDEA_RATING",
    ideaId,
});
export const fetchCompanyStats = (ideaId: number) => ({
    type: "FETCH_COMPANY_STATS",
    ideaId,
});
