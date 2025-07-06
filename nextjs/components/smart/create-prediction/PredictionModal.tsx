import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { initCreatePrediction } from "../../../ts/init/other/other.init";
import { CreatePredictionSchema } from "../../../ts/validation/create-prediction";
import { axios } from "../../../utils/axios";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";
import { useDispatch } from "react-redux";
import styles from "./CreatePrediction.module.scss";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { CheckboxField } from "../../ordinary/fields-form/checkbox-field/CheckboxField";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import { getProfitAmount } from "../../../modules/personal-account/components/utils/get-result-predict";
import { UserPredict } from "../../../ts/types/entity/user.types";
import {
    addUserPrediction,
    getBalance,
    removePrediction,
} from "../../../redux/actions/userActions";

interface PredictionModal {
    open: boolean;
    setOpen: (state: boolean) => void;
    company: CompanyModel;
}

export const CreatePrediction: React.FC<PredictionModal> = ({
    open,
    setOpen,
    company,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useRootSelector((state) => state.user.data);

    const handleClosePosition = async () => {
        const predict: UserPredict = user.predictions.find(
            (p) => p.company_id === company.company_id
        );
        const profit = getProfitAmount({
            ...predict,
            current_price: company.last_price,
        });
        const result = await axios.post(
            `${process.env.API_URL}/api/user/predictions/${predict.id}/close`,
            {
                profit,
            }
        );
        dispatch(removePrediction(predict));
        dispatch(getBalance());
        console.log(result);
    };

    const handleSubmit = (form) => {
        if (user.balance < 1 + form.amount) {
            dispatch(
                alertError("Недостаточно средств для ставки, пополните баланс")
            );
            return;
        }
        axios
            .post(`${process.env.API_URL}/api/user/predictions`, {
                ...form,
                price: company.last_price,
                company_id: company.company_id,
            })
            .then((res) => {
                dispatch(addUserPrediction(res.data));
                dispatch(getBalance());
                setOpen(false);
                dispatch(alertSuccess("Prediction successfully created"));
            })
            .catch((e) => {
                switch (e?.response?.status) {
                    case 405:
                        dispatch(
                            alertError("You have prediction by this stock")
                        );
                        setOpen(false);
                        break;
                    default:
                        dispatch(alertError("An error has occurred"));
                        break;
                }
            });
    };
    const hasPrediction = useMemo(() => {
        if (!user) {
            return false;
        }
        return !!user.predictions.find(
            (p) => p.company_id === company.company_id
        );
    }, [user]);

    const formik = useFormik({
        initialValues: initCreatePrediction,
        validationSchema: CreatePredictionSchema,
        onSubmit: handleSubmit,
    });
    console.log(formik.values, formik.errors);

    return (
        <Dialog
            open={open}
            classes={{
                paper: styles.dialogContainer,
            }}
            onClose={() => setOpen(false)}
        >
            <form
                onSubmit={
                    hasPrediction ? handleClosePosition : formik.handleSubmit
                }
            >
                <DialogTitle id="alert-dialog-title">
                    {t("Create prediction")}
                </DialogTitle>
                <DialogContent className={styles.containerModal}>
                    {!hasPrediction ? (
                        <Fragment>
                            <TextField
                                onChange={formik.handleChange}
                                sx={{ m: 1 }}
                                label={t("deal")}
                                type="number"
                                disabled={hasPrediction}
                                name="amount"
                                error={Boolean(formik.errors.amount)}
                                helperText={
                                    formik.errors.amount
                                        ? formik.errors.amount
                                        : ""
                                }
                            />
                            <CheckboxField
                                disabled={hasPrediction}
                                value={!formik.values.is_top}
                                label="Ставка на понижение"
                                handleChange={(e) =>
                                    formik.setFieldValue(
                                        "is_top",
                                        !e.target.checked
                                    )
                                }
                                name="is_top"
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div></div>
                        </Fragment>
                    )}
                    <span className={styles.attention}>Информация:</span>

                    <div className={styles.tariffWrapper}>
                        <div className={styles.infoWrapper}>
                            <span className={styles.label}>
                                Прибыль фиксируется на момент закрытия сделки
                            </span>
                        </div>
                        <div className={styles.infoWrapper}>
                            <span className={styles.label}>
                                Прибыль расчитывается по формуле = Ставка ×
                                ((Текущая цена / Цена на момент ставки) × 100 -
                                100)
                            </span>
                        </div>
                    </div>

                    <span className={styles.attention}>Тариф:</span>

                    <div className={styles.tariffWrapper}>
                        <div className={styles.infoWrapper}>
                            <span className={styles.label}>
                                Комиссия за сделку
                            </span>
                            <div className="lineDoter"></div>
                            <div className={styles.amountBlock}>
                                15
                                <img src="/images/picture/tg-star.svg" />
                            </div>
                        </div>
                        <div className={styles.infoWrapper}>
                            <span className={styles.label}>
                                Комиссия за перенос сделки на следующий
                                день(начиная с 3-го дня)
                            </span>
                            <div className="lineDoter"></div>
                            <div className={styles.amountBlock}>
                                15
                                <img src="/images/picture/tg-star.svg" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>{t("Close")}</Button>
                    {hasPrediction ? (
                        <Button
                            type="button"
                            onClick={handleClosePosition}
                            autoFocus
                        >
                            {t("Закрыть сделку")}
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={hasPrediction || !formik.isValid}
                            autoFocus
                        >
                            {t("Create")}
                        </Button>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
};
