import { AlertStore, StoreData } from "./store.types";
import {
    initialCreateIdeaStore,
    initialViewStore,
} from "../../init/redux/reducer.initial";
import { AdminStore } from "../../../redux/ts/types/admin/admin-store.types";
import { MainStore } from "../../../redux/ts/types/main/main-store.types";

export const initMainStore: MainStore = {
    news: null,
    investmentData: {
        bestProfit: null,
        worseProfit: null,
        investmentIdeas: null,
        ideaStatistics: null,
    },
    otherData: {
        countries: null,
    },
    articles: {
        popular: null,
        simple: null,
    },
};

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
        stats: {
            newUsersWeek: null,
            newUsersToday: null,
        },
        list: [],
        lastPage: null,
    },
};

export const initStore: StoreData = {
    user: null,
    main: initMainStore,
    admin: initialAdminStore,
    alert: initialAlertStore,
    view: initialViewStore,
};
