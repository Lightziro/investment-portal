import { AlertStore } from "../../ts/types/redux/store.types";
import { AlertColor } from "@mui/material";

export const setAlert = (
    message: string,
    status: AlertColor = "success"
): AlertStore => ({
    state: true,
    status,
    message,
});
