import { PersonalAccountStore } from "../ts/types/personal-account/personal-account-store.type";
import { changeViewNotice } from "../../utils/user/user-actions";

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
export const setDataAccount = (
    state: PersonalAccountStore,
    section: string,
    data: any
): PersonalAccountStore => ({
    ...state,
    [section]: { list: data, loading: false },
});
export const setViewNotice = (
    state: PersonalAccountStore,
    noticeId: number
): PersonalAccountStore => ({
    ...state,
    notices: {
        ...state.notices,
        list: changeViewNotice(state.notices.list, noticeId),
    },
});
