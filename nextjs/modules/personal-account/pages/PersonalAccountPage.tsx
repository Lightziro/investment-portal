import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { useDispatch } from "react-redux";
import { fetchUserStats } from "../../../redux/actions/personal-account/userStatsActions";
import { Statistic } from "antd";
import SvgTgStar from "../../../public/images/picture/tg-star.svg";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import styles from "./PersonalAccountPage.module.scss";

export const PersonalAccountPage = ({}) => {
    const dispatch = useDispatch();
    const { data, loading } = useRootSelector((state) => state.account.stats);
    useEffect(() => {
        dispatch(fetchUserStats());
    }, []);
    return (
        <>
            {/*<HeaderPage title="Main" />*/}
            <div className={styles.container}>
                <div className={styles.statsWrapper}>
                    <Statistic
                        loading={loading}
                        title="Заработано"
                        value={data?.profit}
                        prefix={<img src="/images/picture/tg-star.svg" />}
                    />
                    <Statistic
                        loading={loading}
                        title="Пополнений"
                        value={data?.upBalance}
                        prefix={<img src="/images/picture/tg-star.svg" />}
                    />
                </div>
            </div>
        </>
    );
};
