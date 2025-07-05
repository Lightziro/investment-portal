import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Paper, Stack } from "@mui/material";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { useDispatch } from "react-redux";
import {
    deletePredict,
    fetchUserPrediction,
    setVisiblePredict,
} from "../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { List } from "antd";
import { UserPredict } from "../../../ts/types/entity/user.types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import classes from "../PersonalAccount.module.scss";
import {
    getProfitAmount,
    getResultPredict,
} from "../components/utils/get-result-predict";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import styles from "./MyStockPage.module.scss";

export const MyStockPage: React.FC = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
    const [selectPredict, setSelectedPredict] = useState<UserPredict>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
        event: React.MouseEvent<SVGSVGElement>,
        company: UserPredict
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedPredict(company);
    };
    const handleClose = () => {
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
        <Paper sx={{ p: 2 }}>
            <HeaderPage title="My predictions">
                In this section you can get acquainted with your stock
                forecasts. To delete the forecast, click on the cross
            </HeaderPage>
            <List
                loading={loading}
                dataSource={list}
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
                                    src={`${process.env.API_URL}/storage/${item.company.logo_path}`}
                                />
                            }
                            title={item.company.name}
                            description={
                                <div className={styles.columns}>
                                    <div className={styles.wrapperPrice}>
                                        <span>
                                            Текущая цена / Цена позиции:
                                        </span>
                                    </div>
                                    <span className={classes.predictPrices}>
                                        {`${item.current_price}$ / ${item.price}$`}
                                    </span>
                                    <span>
                                        {`(${getResultPredict(item)}%)`}
                                    </span>
                                    <span>
                                        Прибыль: {getProfitAmount(item)}
                                        <img src="/images/picture/tg-star.svg" />
                                    </span>
                                </div>
                            }
                        />
                        {/*<IconButton*/}
                        {/*    component="span"*/}
                        {/*    onClick={*/}
                        {/*        item.visible*/}
                        {/*            ? () =>*/}
                        {/*                  handleVisible(*/}
                        {/*                      false,*/}
                        {/*                      item.prediction_id*/}
                        {/*                  )*/}
                        {/*            : () =>*/}
                        {/*                  handleVisible(*/}
                        {/*                      true,*/}
                        {/*                      item.prediction_id*/}
                        {/*                  )*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {item.visible ? (*/}
                        {/*        <VisibilityIcon />*/}
                        {/*    ) : (*/}
                        {/*        <VisibilityOffIcon />*/}
                        {/*    )}*/}
                        {/*</IconButton>*/}
                        <IconButton component="span">
                            <AttachMoneyOutlinedIcon
                                onClick={(e) => handleClick(e, item)}
                            />
                        </IconButton>
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
                <MenuItem onClick={handleClose}>Закрыть позицию</MenuItem>
            </Menu>
        </Paper>
    );
};
