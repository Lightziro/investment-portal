export const getPossibleProfit = (
    priceBuy: number,
    priceSell: number,
    isShort = false
) => {
    if (priceBuy > 0 && priceSell > 0) {
        if (isShort) {
            return (((priceBuy - priceSell) / priceSell) * 100).toFixed(2);
        }
        return (((priceSell - priceBuy) / priceBuy) * 100).toFixed(2);
    }
    return "";
};
export const isShort = (priceBuy: number, priceSell: number) =>
    priceBuy > priceSell;
