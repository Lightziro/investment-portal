export const fetchUserPrediction = () => ({
    type: "FETCH_USER_PREDICTION",
});
export const deletePredict = (predictId: number) => ({
    type: "SEND_DELETE_PREDICT",
    predictId,
});
export const fetchUserNotices = () => ({
    type: 'FETCH_USER_NOTICES'
})
