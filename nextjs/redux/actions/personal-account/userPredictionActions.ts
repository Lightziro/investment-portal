export const fetchUserPrediction = () => ({
    type: "FETCH_USER_PREDICTION",
});
export const deletePredict = (predictId: number) => ({
    type: "SEND_DELETE_PREDICT",
    predictId,
});
export const fetchUserNotices = () => ({
    type: "FETCH_USER_NOTICES",
});
export const setVisiblePredict = (visible: boolean, predictId: number) => ({
    type: "SEND_UPDATE_VISIBLE_PREDICT",
    visible,
    predictId,
});
