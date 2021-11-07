import { Alert } from "../../ts/types/redux/store.types";
import { AlertColor } from "@mui/material";

export const setAlert = (
    message: string,
    status: AlertColor = "success"
): Alert => ({
    state: true,
    status,
    message,
});
