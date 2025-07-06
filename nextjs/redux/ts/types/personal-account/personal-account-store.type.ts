import {
    UserNoticeModel,
    UserPredict,
} from "../../../../ts/types/entity/user.types";

export interface PersonalAccountStore {
    predictions: AccountUserPredict;
    notices: AccountUserNotice;
    transactions: AccountUserTransactions;
    stats: AccountStats;
}
export interface AccountUserPredict {
    list: UserPredict[];
    loading: boolean;
}
export interface AccountStats {
    data: any;
    loading: boolean;
}
export interface AccountUserNotice {
    list: UserNoticeModel[];
    loading: boolean;
    total: number | null;
    page: number | null;
}

export interface AccountUserTransactions {
    list: any[];
    loading: boolean;
}
