import { AdminStore, MainStore, StoreData } from "./store.types";

export const initMainStore: MainStore = {
    user: null,
    news: null,
    investmentData: {
        bestProfit: null,
        worseProfit: null,
        actualIdeas: null,
    },
};
export const initialAdminStore: AdminStore = {
    investmentIdeas: {
        viewToday: null,
        likedToday: null,
    },
};

export const initStore: StoreData = {
    main: initMainStore,
    admin: initialAdminStore,
};
