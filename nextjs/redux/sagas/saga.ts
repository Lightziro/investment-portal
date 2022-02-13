import { actionMainWatcher } from "./mainSaga";
import { all } from "redux-saga/effects";
import { actionAdminWatcher } from "./adminSaga";
import { actionInvestmentIdea } from "./investmentIdeaSaga";
import { actionArticleWatcher } from "./articleSaga";
import { actionUserWatcher } from "./userSaga";
import { actionAccountWatcher } from "./accountSaga";

export default function* rootSaga(): Generator {
    yield all([
        actionMainWatcher(),
        actionAdminWatcher(),
        actionInvestmentIdea(),
        actionArticleWatcher(),
        actionUserWatcher(),
        actionAccountWatcher(),
    ]);
}
