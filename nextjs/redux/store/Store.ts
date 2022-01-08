import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";
import { StoreData } from "../../ts/types/redux/store.types";
import { initStore } from "../../ts/types/redux/store.init";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "../reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();
let clientInitStore = initStore;
if (process.browser) {
    const serverStore = window.serverStoreState;
    clientInitStore = { ...initStore, ...serverStore };
    delete window.serverStoreState;
}

export const clientStore = createStore(
    reducer,
    clientInitStore,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export const serverStore: Store<StoreData> = (initServer) =>
    createStore(
        reducer,
        initServer,
        composeWithDevTools(applyMiddleware(sagaMiddleware)) // composeWithDevTools off
    );
