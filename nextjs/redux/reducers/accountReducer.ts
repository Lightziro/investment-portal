import { AnyAction } from "redux";
import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";
import {
    removePredict,
    setDataAccount,
    setDataAccountPagination,
    setViewNotice,
    setVisiblePrediction,
} from "../utils/account.utils";

const accountReducer = (
    state: PersonalAccountStore = null,
    action: AnyAction
): PersonalAccountStore => {
    switch (action.type) {
        case "SET_PREDICTION_LIST":
            return setDataAccount(state, "predictions", action.data);
        case "SEND_DELETE_PREDICT":
        case "SEND_UPDATE_VISIBLE_PREDICT":
            return {
                ...state,
                predictions: { ...state.predictions, loading: true },
            };
        case "SET_LOADING_TRANSACTIONS":
            return {
                ...state,
                transactions: { ...state.transactions, loading: action.value },
            };
        case "SET_ACCOUNT_TRANSACTIONS":
            return setDataAccount(state, "transactions", action.payload);
        case "REMOVE_PREDICT_ITEM":
            return removePredict(state, action.predictId);
        case "SET_VISIBLE_PREDICTION":
            return setVisiblePrediction(
                state,
                action.predictId,
                action.visible
            );
        case "SET_USER_NOTICES":
            return setDataAccountPagination(state, "notices", action.data);
        case "SET_NOTICE_VIEW":
            return setViewNotice(state, action.id);
        case "SET_MAIN_STATS":
            return {
                ...state,
                stats: {
                    data: action.data,
                    loading: false,
                },
            };
        default:
            return state;
    }
};
export default accountReducer;
