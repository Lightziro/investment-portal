import { AnyAction } from "redux";
import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";

const accountReducer = (
    state: PersonalAccountStore = null,
    action: AnyAction
): PersonalAccountStore => {
    switch (action.type) {
        case "SET_PREDICTION_LIST":
            return { ...state, predictions: action.data };
        case "REMOVE_PREDICT_ITEM":
            return {
                ...state,
                predictions: state.predictions.filter(
                    (predict) => predict.prediction_id !== action.predictId
                ),
            };
        default:
            return state;
    }
};
export default accountReducer;
