export const formatQuote = (quoteValue: number | string) =>
    quoteValue > 0 ? `+${quoteValue}` : quoteValue;
