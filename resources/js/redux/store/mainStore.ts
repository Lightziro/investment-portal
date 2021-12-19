import { applyMiddleware, createStore, combineReducers, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import mainReducer from "../reducers/mainReducer";
import { StoreData } from "../../ts/types/redux/store.types";
import rootSaga from "../sagas/saga";
import { initStore } from "../../ts/types/redux/store.init";
import adminReducer from "../reducers/adminReducer";
import alertReducer from "../reducers/alertReducer";
import viewReducer from "../reducers/viewReducer";
import createIdeaReducer from "../reducers/createIdeaReducer";

const sagaMiddleware = createSagaMiddleware();

export const mainStore: Store<StoreData> = createStore(
    combineReducers({
        main: mainReducer,
        admin: adminReducer,
        alert: alertReducer,
        view: viewReducer,
    }),
    initStore,
    applyMiddleware(sagaMiddleware) // composeWithDevTools off
);

sagaMiddleware.run(rootSaga);
