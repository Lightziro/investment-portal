import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import mainReducer from "./mainReducer";
import adminReducer from "./adminReducer";
import alertReducer from "./alertReducer";
import viewReducer from "./viewReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    main: mainReducer,
    admin: adminReducer,
    alert: alertReducer,
    view: viewReducer,
});

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>;
