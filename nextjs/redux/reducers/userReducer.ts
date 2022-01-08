import { MainStore, UserStore } from "../../ts/types/redux/store.types";
import { AnyAction } from "redux";

const userReducer = (state: UserStore = null, action: AnyAction): MainStore => {
    switch (action.type) {
        case "SET_USER":
            console.log("BASE");
            return action.user;
        default:
            console.log("CLEAR");
            return state;
    }
};
export default userReducer;
