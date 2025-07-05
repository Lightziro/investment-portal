import { UserPredict } from "../../../../ts/types/entity/user.types";

export const getResultPredict = (item: UserPredict) => {
    const result = (100 - (item.current_price / item.price) * 100).toFixed(2);
    if (item.is_top) {
        console.log(item);
        return result;
    }
    return -result;
};

export const getProfitAmount = (item: UserPredict) => {
    const percent = getResultPredict(item);
    return ((item.amount * percent) / 100).toFixed(0);
};
