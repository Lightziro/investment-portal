import { AdminStore, MainStore, StoreData } from "./store.types";

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
    alert: null,
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
};

export const initStore: StoreData = {
    main: initMainStore,
    admin: initialAdminStore,
};
