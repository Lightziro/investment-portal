export const alertSuccess = (message: string) => ({
    type: "SET_ALERT_SUCCESS",
    message,
});
export const alertError = (message: string) => ({
    type: "SET_ALERT_ERROR",
    message,
});
export const alertInfo = (message: string) => ({
    type: "SET_ALERT_INFO",
    message,
});
export const clearAlert = () => ({
    type: "CLEAR_ALERT",
});
