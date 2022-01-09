import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";
import { StoreData } from "../../ts/types/redux/store.types";
import { initStore } from "../../ts/types/redux/store.init";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../reducers/userReducer";
import mainReducer from "../reducers/mainReducer";
import adminReducer from "../reducers/adminReducer";
import alertReducer from "../reducers/alertReducer";
import viewReducer from "../reducers/viewReducer";

const sagaMiddleware = createSagaMiddleware();
let clientInitStore = initStore;
if (process.browser) {
    const serverStore = window.serverStoreState;
    clientInitStore = { ...initStore, ...serverStore };
    delete window.serverStoreState;
}
const reducers = combineReducers({
    user: userReducer,
    main: mainReducer,
    admin: adminReducer,
    alert: alertReducer,
    view: viewReducer,
});
export const clientStore = createStore(
    reducers,
    clientInitStore,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export const serverStore: Store<StoreData> = (initServer) =>
    createStore(
        reducers,
        initServer,
        composeWithDevTools(applyMiddleware(sagaMiddleware)) // composeWithDevTools off
    );
