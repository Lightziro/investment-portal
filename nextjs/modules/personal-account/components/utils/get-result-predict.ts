import { UserPredict } from "../../../../ts/types/entity/user.types";

export const getResultPredict = (item: UserPredict) => {
    const { price, current_price, is_top } = item;

    const rawResult = ((current_price - price) / price) * 100;
    const result = is_top ? rawResult : -rawResult;

    return result.toFixed(2);
};

export const getResultEndPredict = (item: UserPredict) => {
    if (!item.close_price) {
        return 0;
    }
    const { price, close_price, is_top } = item;

    const rawResult = ((close_price - price) / price) * 100;
    const result = is_top ? rawResult : -rawResult;

    return result.toFixed(2);
};

export const getProfitAmount = (item: UserPredict) => {
    const percent = getResultPredict(item);
    return ((item.amount * percent) / 100).toFixed(0);
};

export const getProfitEndPredict = (item: UserPredict) => {
    const percent = getResultEndPredict(item);
    return ((item.amount * percent) / 100).toFixed(0);
};
