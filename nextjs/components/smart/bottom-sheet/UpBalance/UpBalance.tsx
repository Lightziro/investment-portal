import { Divider } from "@mui/material";
import styles from "./UpBalance.module.scss";
import React, { useState } from "react";
import cn from "classnames";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { axios } from "../../../../utils/axios";
import { invoice, isInvoiceSupported } from "@telegram-apps/sdk";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../redux/actions/userActions";
import { setCloseSheet } from "../../../../redux/actions/sheetActions";
import {
    alertError,
    alertSuccess,
} from "../../../../redux/actions/alertActions";

const UpBalance = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const balanceUp = [1, 50, 100, 200, 300, 500];
    const [val, setVal] = useState(balanceUp[0]);

    const handleUp = async () => {
        const data = await axios
            .post(`${process.env.API_URL}/api/user/balance/up-get-link`, {
                value: val,
            })
            .then((res) => res.data);
        if (isInvoiceSupported()) {
            const success = await invoice.open(data.data.result, "url");
            if (success === "paid") {
                dispatch(getUser());
                dispatch(alertSuccess("Up balance success"));
                dispatch(setCloseSheet());
                return;
            }
        } else {
            window.location.href = data.data.result;
            return;
        }

        dispatch(alertError("Error up balance"));
        console.log(data);
    };

    return (
        <div className={styles.wrapper}>
            <Divider></Divider>
            <div className={styles.upRow}>
                {balanceUp.map((value) => {
                    return (
                        <div
                            className={cn(styles.block, {
                                [styles.active]: val === value,
                            })}
                            onClick={() => setVal(value)}
                            key={value}
                        >
                            {value}
                            <img src="/images/picture/tg-star.svg" />
                        </div>
                    );
                })}
            </div>
            <Button onClick={handleUp} type="primary" block>
                {t("Up balance")}
            </Button>
        </div>
    );
};
export default UpBalance;
