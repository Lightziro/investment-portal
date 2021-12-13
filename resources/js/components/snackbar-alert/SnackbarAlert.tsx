import React, { Fragment } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { clearAlert } from "../../redux/actions/alertActions";

export const SnackbarAlert: React.FC = () => {
    const { t } = useTranslation();
    const alert = useSelector((state: StoreData) => state.alert);
    const dispatch = useDispatch();
    return (
        <Fragment>
            {alert && (
                <Snackbar
                    open={alert.state}
                    autoHideDuration={6000}
                    onClose={() => dispatch(clearAlert())}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        // onClose={() => dispatch(clearAlert())}
                        severity={alert.status}
                        sx={{ width: "100%" }}
                    >
                        {t(alert.message)}
                    </Alert>
                </Snackbar>
            )}
        </Fragment>
    );
};
