import { AnyAction } from "redux";
import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";
import {
    removePredict,
    setDataAccount,
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
        case "REMOVE_PREDICT_ITEM":
            return removePredict(state, action.predictId);
        case "SET_VISIBLE_PREDICTION":
            return setVisiblePrediction(
                state,
                action.predictId,
                action.visible
            );
        case "SET_USER_NOTICES":
            return setDataAccount(state, "notices", action.data);
        case "SET_NOTICE_VIEW":
            return setViewNotice(state, action.id);
        case "SET_MAIN_STATS":
            return setDataAccount(state, "main", action.data);
        default:
            return state;
    }
};
export default accountReducer;
