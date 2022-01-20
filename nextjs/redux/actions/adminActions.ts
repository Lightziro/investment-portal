import { NewsPrediction } from "../../ts/types/redux/store.types";

export const fetchInvestmentData = () => ({
    type: "FETCH_ADMIN_INVESTMENT_DATA",
});
export const fetchAnalyticData = () => ({
    type: "FETCH_ANALYTIC_DATA",
});
export const retrainNewsClassifier = (trainData: NewsPrediction[]) => ({
    type: "RETRAIN_NEWS_CLASSIFIER",
    trainData,
});
export const setArticleDialog = (state: boolean = true) => ({
    type: "SET_ARTICLE_DIALOG",
    state,
});
