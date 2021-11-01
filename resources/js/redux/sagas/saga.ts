import { actionMainWatcher } from "./mainSaga";
import { all } from "redux-saga/effects";
import { actionAdminWatcher } from "./adminSaga";

export default function* rootSaga(): Generator {
    yield all([actionMainWatcher(), actionAdminWatcher()]);
}
