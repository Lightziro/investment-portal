import { AnyAction } from "redux";
import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";
import { removePredict, setDataAccount } from "../utils/account.utils";

const accountReducer = (
    state: PersonalAccountStore = null,
    action: AnyAction
): PersonalAccountStore => {
    switch (action.type) {
        case "SET_PREDICTION_LIST":
            return setDataAccount(state, "predictions", action.data);
        case "SEND_DELETE_PREDICT":
            return {
                ...state,
                predictions: { ...state.predictions, loading: true },
            };
        case "REMOVE_PREDICT_ITEM":
            return removePredict(state, action.predictId);
        case "SET_USER_NOTICES":
            return setDataAccount(state, "notices", action.data);
        default:
            return state;
    }
};
export default accountReducer;
