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
        default:
            return state;
    }
};
export default userReducer;
