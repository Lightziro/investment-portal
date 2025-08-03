import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Paper, Stack } from "@mui/material";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { useDispatch } from "react-redux";
import { fetchUserPrediction } from "../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { List } from "antd";
import { UserPredict } from "../../../ts/types/entity/user.types";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import classes from "../PersonalAccount.module.scss";
import {
    getProfitAmount,
    getProfitEndPredict,
    getResultPredict,
} from "../components/utils/get-result-predict";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "./MyStockPage.module.scss";
import { getCurrencyShow } from "../../../utils/other";
import SvgStar from "../../../public/images/picture/tg-star.svg";
import { axios } from "../../../utils/axios";
import {
    getBalance,
    removePrediction,
} from "../../../redux/actions/userActions";

export const MyStockPage: React.FC = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
    const [selectPredict, setSelectedPredict] = useState<UserPredict>(null);
    const [onLoadClose, setOnLoadClose] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (
        event: React.MouseEvent<SVGSVGElement>,
        company: UserPredict
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedPredict(company);
    };
    const handleClose = async () => {
        setOnLoadClose(true);
        const profit = getProfitAmount(selectPredict);
        await axios.post(
            `${process.env.API_URL}/api/user/predictions/${selectPredict.id}/close`,
            {
                profit,
            }
        );
        dispatch(removePrediction(selectPredict));
        dispatch(getBalance());
        dispatch(fetchUserPrediction());
        setOnLoadClose(false);
        setAnchorEl(null);
        setSelectedPredict(null);
    };
    const router = useRouter();
    useEffect(() => {
        dispatch(fetchUserPrediction());
    }, []);
    const { list, loading } = useRootSelector(
        (state) => state.account.predictions
    );

    return (
        <>
            <List
                loading={loading}
                dataSource={list}
                locale={{
                    emptyText: "Нет прогнозов",
                }}
                renderItem={(item: UserPredict) => (
                    <List.Item key={item.prediction_id}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    onClick={() =>
                                        router.push(
                                            `/company/${item.company_id}`
                                        )
                                    }
                                    src={`/storage/${item.company.logo_path}`}
                                />
                            }
                            title={item.company.name}
                            description={
                                <div className={styles.columns}>
                                    <div className={styles.wrapperPrice}>
                                        <span>
                                            Цена прогноза | Текущая цена:
                                        </span>
                                    </div>
                                    <span className={classes.predictPrices}>
                                        {`${item.price}${getCurrencyShow(
                                            item.currency
                                        )} | ${
                                            item.current_price
                                        }${getCurrencyShow(item.currency)}`}
                                    </span>
                                    <span>Сумма прогноза: {item.amount}</span>
                                    <span className={styles.resultBlock}>
                                        Результат:{" "}
                                        {item.end_at
                                            ? getProfitEndPredict(item)
                                            : getProfitAmount(item)}
                                        <SvgStar />
                                        {`(${getResultPredict(item)}%)`}
                                    </span>
                                </div>
                            }
                        />
                        {!item.end_at && (
                            <IconButton component="span">
                                <AttachMoneyOutlinedIcon
                                    onClick={(e) => handleClick(e, item)}
                                />
                            </IconButton>
                        )}
                    </List.Item>
                )}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() =>
                        router.push(`/company/${selectPredict.company_id}`)
                    }
                >
                    Компания
                </MenuItem>
                <MenuItem disabled={onLoadClose} onClick={handleClose}>
                    Закрыть позицию
                </MenuItem>
            </Menu>
        </>
    );
};
