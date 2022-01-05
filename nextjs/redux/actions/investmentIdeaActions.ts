export const createComment = (ideaId: number, text: string) => ({
    type: "CREATE_IDEA_COMMENT",
    commentData: { ideaId, text },
});
