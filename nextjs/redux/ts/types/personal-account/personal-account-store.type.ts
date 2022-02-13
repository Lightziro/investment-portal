import { UserPredict } from "../../../../ts/types/entity/user.types";

export interface PersonalAccountStore {
    predictions: AccountUserPredict;
}
export interface AccountUserPredict {
    list: UserPredict[];
    loading: boolean;
}
