import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";
import { StoreData } from "../../ts/types/redux/store.types";
import { initStore } from "../../ts/types/redux/store.init";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { reducer } from "../reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();

const store: Store<StoreData> = createStore(
    reducer,
    initStore,
    applyMiddleware(sagaMiddleware) // composeWithDevTools off
);
const makeStore: MakeStore<Store<StoreData>> = (context: Context) => store;
export const wrapper = createWrapper<Store<StoreData>>(makeStore, {
    debug: true,
});
sagaMiddleware.run(rootSaga);
