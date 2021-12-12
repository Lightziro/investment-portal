import { AdminStore, AlertStore, MainStore, StoreData } from "./store.types";
import {
    initialUser,
    initialViewStore,
} from "../../init/redux/reducer.initial";

export const initMainStore: MainStore = {
    user: initialUser,
    news: null,
    investmentData: {
        bestProfit: null,
        worseProfit: null,
        investmentIdeas: null,
        ideaStatistics: null,
    },

    profileView: null,
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
    investmentIdeas: {
        viewToday: null,
        commentsToday: null,
    },
    createIdea: {
        companies: [],
        loadInput: false,
        selectedCompany: null,
        stage: 1,
    },
    smartAnalytic: {
        score: {
            classificationNews: null,
        },
        newsForAnalyze: null,
    },
    articles: {
        list: null,
        lastPage: null,
        loading: true,
        dialog: false,
        edit: null,
    },
};

export const initStore: StoreData = {
    main: initMainStore,
    admin: initialAdminStore,
    alert: initialAlertStore,
    view: initialViewStore,
};
