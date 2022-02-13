import { AnyAction } from "redux";
import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";
import { removePredict } from "../utils/account.utils";

const accountReducer = (
    state: PersonalAccountStore = null,
    action: AnyAction
): PersonalAccountStore => {
    switch (action.type) {
        case "SET_PREDICTION_LIST":
            return {
                ...state,
                predictions: { loading: false, list: action.data },
            };
        case "SEND_DELETE_PREDICT":
            return {
                ...state,
                predictions: { ...state.predictions, loading: true },
            };
        case "REMOVE_PREDICT_ITEM":
            return removePredict(state, action.predictId);
        default:
            return state;
    }
};
export default accountReducer;
