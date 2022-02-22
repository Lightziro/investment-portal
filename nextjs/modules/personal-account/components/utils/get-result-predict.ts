export const getResultPredict = (predict: number, current: number) =>
    -(100 - (current / predict) * 100).toFixed(2);
