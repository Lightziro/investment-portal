import { AdminStore, AlertStore, MainStore, StoreData } from "./store.types";

export const initMainStore: MainStore = {
    user: null,
    news: null,
    investmentData: {
        bestProfit: null,
        worseProfit: null,
        // actualIdeas: null,
        ideaStatistics: null,
    },
    ideaView: {
        epsStats: null,
        ideaInfo: null,
        analyticsStats: null,
        companyInfo: null,
        authorInfo: null,
        description: null,
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
};

export const initStore: StoreData = {
    main: initMainStore,
    admin: initialAdminStore,
    alert: initialAlertStore,
};
