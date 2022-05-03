export const getPossibleProfit = (
    priceBuy: number,
    priceSell: number,
    isShort = false
) => {
    if (priceBuy > 0 && priceSell > 0) {
        const result = (100 - (100 * priceBuy) / priceSell).toFixed(2);
        return isShort ? -result : result;
    }
    return "";
};
export const isShort = (priceBuy: number, priceSell: number) =>
    priceBuy > priceSell;
