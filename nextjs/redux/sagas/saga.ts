import { actionMainWatcher } from "./mainSaga";
import { all } from "redux-saga/effects";
import { actionAdminWatcher } from "./adminSaga";
import { actionInvestmentIdea } from "./investmentIdeaSaga";
import { actionProfileWatcher } from "./profileSaga";
import { actionArticleWatcher } from "./articleSaga";
import { actionUserWatcher } from "./userSaga";

export default function* rootSaga(): Generator {
    yield all([
        actionMainWatcher(),
        actionAdminWatcher(),
        actionInvestmentIdea(),
        actionProfileWatcher(),
        actionArticleWatcher(),
        actionUserWatcher(),
    ]);
}
