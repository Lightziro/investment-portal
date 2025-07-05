import { FilterOperations } from "../../../ts/types/other/other.types";

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

export const fetchUserTransactions = (filter: FilterOperations) => ({
    type: "FETCH_USER_TRANSACTIONS",
    filter,
});

export const setLoadingTransactions = (value: boolean) => ({
    type: "SET_LOADING_TRANSACTIONS",
    value,
});
export const setVisiblePredict = (visible: boolean, predictId: number) => ({
    type: "SEND_UPDATE_VISIBLE_PREDICT",
    visible,
    predictId,
});
