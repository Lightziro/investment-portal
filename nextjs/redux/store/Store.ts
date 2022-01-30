import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";
import { initStore } from "../../ts/types/redux/store.init";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "../reducers/userReducer";
import adminReducer from "../reducers/adminReducer";
import alertReducer from "../reducers/alertReducer";
import viewReducer from "../reducers/viewReducer";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
    user: userReducer,
    admin: adminReducer,
    alert: alertReducer,
    view: viewReducer,
});
export const clientStore = createStore(
    reducers,
    initStore,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
