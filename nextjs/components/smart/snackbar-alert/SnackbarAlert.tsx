import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { clearAlert } from "../../../redux/actions/alertActions";
import { StoreData } from "../../../ts/types/redux/store.types";
import { useRootSelector } from "../../../hooks/useTypeSelector";

export const SnackbarAlert: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const alert = useRootSelector((state: StoreData) => state.alert);

    if (!alert) {
        return null;
    }

    return (
        <Snackbar
            open={alert.state}
            autoHideDuration={6000}
            onClose={() => dispatch(clearAlert())}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert severity={alert.status} sx={{ width: "100%" }}>
                {t(alert.message)}
            </Alert>
        </Snackbar>
    );
};
