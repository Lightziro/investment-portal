import { MainStore, UserStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";

const userReducer = (state: UserStore = null, action: AnyAction): MainStore => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return action.user;
        default:
            return state;
    }
};
export default userReducer;
