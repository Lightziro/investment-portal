import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";

export const removePredict = (
    state: PersonalAccountStore,
    predictId: number
): PersonalAccountStore => ({
    ...state,
    predictions: {
        ...state.predictions,
        list: state.predictions.list.filter(
            (predict) => predict.prediction_id !== predictId
        ),
        loading: false,
    },
});
