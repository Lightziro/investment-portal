import { Divider, Tabs } from "@mui/material";
import styles from "./UpBalance.module.scss";
import React, { useState } from "react";
import cn from "classnames";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { axios } from "../../../../utils/axios";
import { invoice, isInvoiceSupported } from "@telegram-apps/sdk";
import { useDispatch } from "react-redux";
import { getBalance, getUser } from "../../../../redux/actions/userActions";
import { setCloseSheet } from "../../../../redux/actions/sheetActions";
import {
    alertError,
    alertSuccess,
} from "../../../../redux/actions/alertActions";
import { formatNumber } from "../../../../utils/other";

type Tab = "star" | "sbp";
const UpBalance = () => {
    const { t } = useTranslation();
    const [tab, setTab] = React.useState<Tab>("star");
    const dispatch = useDispatch();
    const balanceUp = [1, 300, 500, 1000, 3000, 5000, 7500, 10000];
    const [val, setVal] = useState(balanceUp[0]);
    const [loader, setLoader] = useState(false);

    const handleUp = async () => {
        setLoader(true);
        const data = await axios
            .post(`${process.env.API_URL}/api/user/balance/up-get-link`, {
                value: val,
            })
            .then((res) => res.data);
        if (isInvoiceSupported()) {
            const success = await invoice.open(data.data.result, "url");
            if (success === "paid") {
                setTimeout(() => {
                    dispatch(getBalance());
                    dispatch(alertSuccess("Up balance success"));
                    setLoader(false);
                    dispatch(setCloseSheet());
                }, 1500);
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
            <Divider />
            <div className={styles.tabsWrapper}>
                <div
                    className={cn(styles.tabItem, {
                        [styles.active]: tab === "star",
                    })}
                    onClick={() => setTab("star")}
                >
                    Telegram Star
                    <img src="/images/picture/tg-star.svg" />
                </div>
                <div
                    onClick={() => setTab("sbp")}
                    className={cn(styles.tabItem, {
                        [styles.active]: tab === "sbp",
                    })}
                >
                    СБП
                </div>
            </div>
            {tab === "star" && (
                <>
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
                                    {formatNumber(value)}
                                    <img src="/images/picture/tg-star.svg" />
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        loading={loader}
                        onClick={handleUp}
                        type="primary"
                        block
                    >
                        {t("Up balance")}
                    </Button>
                </>
            )}
            {tab === "sbp" && (
                <div className={styles.sbpWrapper}>
                    <img src="/images/picture/sbp.svg" />
                    <div className={styles.text}>
                        Данный вариант пополнения баланса находится в разработке
                    </div>
                </div>
            )}
        </div>
    );
};
export default UpBalance;
