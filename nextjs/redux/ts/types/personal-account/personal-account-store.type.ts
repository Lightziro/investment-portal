import {
    UserNoticeModel,
    UserPredict,
} from "../../../../ts/types/entity/user.types";

export interface PersonalAccountStore {
    predictions: AccountUserPredict;
    notices: AccountUserNotice;
    transactions: AccountUserTransactions;
}
export interface AccountUserPredict {
    list: UserPredict[];
    loading: boolean;
}
export interface AccountUserNotice {
    list: UserNoticeModel[];
    loading: boolean;
}

export interface AccountUserTransactions {
    list: any[];
    loading: boolean;
}
