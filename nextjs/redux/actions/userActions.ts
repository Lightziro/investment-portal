import { FormAuth } from "../../modules/authorization/ts/types/forms.types";
import { UserPredict } from "../../ts/types/entity/user.types";

export const getUser = () => ({
    type: "FETCH_USER",
});
export const login = (userData: FormAuth): any => ({
    type: "LOGIN_USER",
    userData,
});
export const logoutUser = () => ({
    type: "LOGOUT_USER",
});

export const addUserPrediction = (predict: UserPredict): any => ({
    type: "ADD_USER_PREDICTION",
    payload: predict,
});

export const removePrediction = (predict: UserPredict): any => ({
    type: "REMOVE_USER_PREDICTION",
    payload: predict,
});

export const getBalance = (): any => ({
    type: "FETCH_BALANCE",
});
