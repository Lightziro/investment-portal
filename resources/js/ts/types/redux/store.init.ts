import {
    AdminStore,
    AlertStore,
    MainStore,
    ProfileView,
    StoreData,
} from "./store.types";

export const initialIdeaView = {
    epsStats: null,
    ideaInfo: null,
    analyticsStats: null,
    companyInfo: null,
    authorInfo: null,
    description: null,
    comments: null,
    ideaId: null,
};

export const initMainStore: MainStore = {
    user: {
        userId: null,
        fullName: null,
        role: null,
        notices: [],
    },
    news: null,
    investmentData: {
        bestProfit: null,
        worseProfit: null,
        // actualIdeas: null,
        ideaStatistics: null,
    },
    ideaView: initialIdeaView,
    profileView: null,
    otherData: {
        countries: null,
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
