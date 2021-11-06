import React, { Fragment } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { clearAlert } from "../../redux/actions/mainActions";

export const SnackbarAlert: React.FC = () => {
    const alert = useSelector((state: StoreData) => state.main.alert);
    const dispatch = useDispatch();
    return (
        <Fragment>
            {alert && (
                <Snackbar
                    open={alert.state}
                    autoHideDuration={6000}
                    onClose={() => dispatch(clearAlert())}
                >
                    <Alert
                        onClose={() => dispatch(clearAlert())}
                        severity={alert.status}
                        sx={{ width: "100%" }}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </Fragment>
    );
};
