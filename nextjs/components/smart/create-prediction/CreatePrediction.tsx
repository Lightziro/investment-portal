import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { initCreatePrediction } from "../../../ts/init/other/other.init";
import { CreatePredictionSchema } from "../../../ts/validation/create-prediction";
import { axios } from "../../../utils/axios";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";
import { useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

interface CreatePrediction {
    open: boolean;
    setOpen: (state: boolean) => void;
    companyId: boolean;
}
export const CreatePrediction: React.FC<CreatePrediction> = ({
    open,
    setOpen,
    companyId,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleSubmit = (form) => {
        axios
            .post(`${process.env.API_URL}/api/user/predictions`, {
                ...form,
                company_id: companyId,
            })
            .then((res) => {
                setOpen(false);
                dispatch(alertSuccess("Prediction successfully created"));
            })
            .catch((e) => dispatch(alertError("An error has occurred")));
    };

    const formik = useFormik({
        initialValues: initCreatePrediction,
        validationSchema: CreatePredictionSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                    {t("Create prediction")}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={formik.handleChange}
                        sx={{ m: 1 }}
                        label={t("Price prediction")}
                        type="number"
                        name="predict_price"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        {t("Cancel")}
                    </Button>
                    <Button type="submit" autoFocus>
                        {t("Create")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
