import { UserStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";
import { setNoticeView } from "../utils/user.utils";

const userReducer = (state: UserStore = null, action: AnyAction): UserStore => {
    switch (action.type) {
        case "SET_USER":
            return { data: action.user, fetch: true };
        case "SET_LOGOUT":
            return { data: null, fetch: false };
        case "SET_FETCH":
            return { ...state, fetch: action.state };
        case "SET_NOTICE_VIEW":
            return setNoticeView(state, action.id);
        case "ADD_USER_PREDICTION":
            return {
                ...state,
                data: {
                    ...state.data,
                    predictions: [...state.data.predictions, action.payload],
                },
            };
        case "SET_USER_BALANCE":
            return {
                ...state,
                data: {
                    ...state.data,
                    balance: action.payload,
                },
            };
        case "REMOVE_USER_PREDICTION":
            return {
                ...state,
                data: {
                    ...state.data,
                    predictions: state.data.predictions.filter(
                        (pred) =>
                            pred.prediction_id !== action.payload.prediction_id
                    ),
                },
            };
        default:
            return state;
    }
};
export default userReducer;
