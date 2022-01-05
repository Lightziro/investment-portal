import { AlertStore } from "../../ts/types/redux/store.types";
import { initialAlertStore } from "../../ts/types/redux/store.init";
import { AnyAction } from "redux";
import { setAlert } from "../utils/alert.utils";

const alertReducer = (
    state: AlertStore = initialAlertStore,
    action: AnyAction
): AlertStore => {
    switch (action.type) {
        case "SET_ALERT_SUCCESS":
            return setAlert(action.message, "success");
        case "SET_ALERT_ERROR":
            return setAlert(action.message, "error");
        case "CLEAR_ALERT":
            return { message: null, status: "success", state: false };
        case "SET_ALERT_INFO":
            return setAlert(action.message, "info");
        default:
            return state;
    }
};
export default alertReducer;
