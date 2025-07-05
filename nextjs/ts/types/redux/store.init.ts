import { AlertStore, SheetStore, StoreData } from "./store.types";
import {
    initialAccountStore,
    initialCreateIdeaStore,
    initialViewStore,
} from "../../init/redux/reducer.initial";
import { AdminStore } from "../../../redux/ts/types/admin/admin-store.types";

export const initialAlertStore: AlertStore = {
    message: "",
    state: false,
    status: "success",
};
export const initialAdminStore: AdminStore = {
    createIdea: initialCreateIdeaStore,
    investmentIdeas: {
        viewToday: null,
        commentsToday: null,
        list: [],
        lastPage: null,
        loading: true,
    },
    smartAnalytic: {
        score: {
            classificationNews: null,
        },
        newsForAnalyze: null,
    },
    articles: {
        list: [],
        lastPage: null,
        loading: true,
        dialog: false,
        edit: null,
    },
    users: {
        list: [],
        lastPage: null,
        loading: true,
    },
    companies: {
        list: [],
        lastPage: null,
        loading: true,
    },
};
export const initStoreSheet: SheetStore = {
    propsSheet: {},
    sheetType: null,
    isOpenSheet: false,
};

export const initStore: StoreData = {
    user: {
        data: null,
        fetch: false,
    },
    admin: initialAdminStore,
    alert: initialAlertStore,
    view: initialViewStore,
    sheet: initStoreSheet,
    account: initialAccountStore,
};
