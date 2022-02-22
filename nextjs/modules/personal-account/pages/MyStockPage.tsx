import React, { useEffect } from "react";
import { Avatar, IconButton, Paper, Stack } from "@mui/material";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { useDispatch } from "react-redux";
import {
    deletePredict,
    fetchUserPrediction,
} from "../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { List } from "antd";
import { UserPredict } from "../../../ts/types/entity/user.types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import classes from "../PersonalAccount.module.scss";
import { getResultPredict } from "../components/utils/get-result-predict";

export const MyStockPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserPrediction());
    }, []);
    const { list, loading } = useRootSelector(
        (state) => state.account.predictions
    );
    const handleDelete = (predictId: number) => {
        dispatch(deletePredict(predictId));
    };
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
                                    src={`${process.env.API_URL}/storage/${item.company.logo}`}
                                />
                            }
                            title={item.company.name}
                            description={
                                <Stack direction="row" spacing={1}>
                                    <span>Текущая цена / Прогноз:</span>
                                    <span className={classes.predictPrices}>
                                        {`${item.current_price}$ / ${item.predict_price}$`}
                                    </span>
                                    <span>
                                        {`(${getResultPredict(
                                            item.predict_price,
                                            item.current_price
                                        )}%)`}
                                    </span>
                                </Stack>
                            }
                        />
                        <IconButton component="span">
                            <RemoveCircleOutlineIcon
                                onClick={() => handleDelete(item.prediction_id)}
                            />
                        </IconButton>
                    </List.Item>
                )}
            />
        </Paper>
    );
};
