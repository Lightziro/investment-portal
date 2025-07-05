export const setOpenSheet = (typeSheet: string, propsSheet) => ({
    type: "SET_OPEN_SHEET",
    typeSheet,
    propsSheet,
});

export const setCloseSheet = () => ({
    type: "SET_CLOSE_SHEET",
});
