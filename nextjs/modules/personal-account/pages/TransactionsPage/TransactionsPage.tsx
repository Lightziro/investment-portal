import React, { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
    fetchUserTransactions,
    setLoadingTransactions,
} from "../../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { HeaderPage } from "../../components/header-page/HeaderPage";
import { List } from "antd";
import { SelectField } from "../../../../components/ordinary/fields-form/select-field/SelectField";
import { FilterOperations } from "../../../../ts/types/other/other.types";
const TYPE_EVENT = [
    {
        label: "Все",
        value: "",
    },
    {
        label: "Пополнение счета",
        value: "up-money",
    },
    {
        label: "Комиссия за сделку",
        value: "commission-deal",
    },
];
export const TransactionsPage: React.FC = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState<FilterOperations>({
        event: "",
    });
    useEffect(() => {
        dispatch(setLoadingTransactions(true));
        dispatch(fetchUserTransactions(filter));
    }, [filter]);
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    const { list, loading } = useRootSelector(
        (state) => state.account.transactions
    );

    const handleChangeFiler = (name, value) =>
        setFilter((prev) => ({ ...prev, [name]: value }));

    console.log(filter);

    return (
        <>
            <div>
                <SelectField
                    label="Тип операции"
                    value={filter.event}
                    items={TYPE_EVENT}
                    handleChange={(e) =>
                        handleChangeFiler("event", e.target.value)
                    }
                />
            </div>
            <List
                itemLayout="horizontal"
                dataSource={list}
                loading={loading}
                locale={{
                    emptyText: "Нет операций по балансу",
                }}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            // className={classNames(
                            //     classes.wrapperNotices,
                            //     getViewClass(classes.notView, item.viewed)
                            // )}
                            title={
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <span>{item.name}</span>
                                    <span>
                                        {moment(item.created_at).format(
                                            "DD.MM.YYYY HH:mm"
                                        )}
                                    </span>
                                </Stack>
                            }
                            description={
                                <div>
                                    {item.amount}
                                    <img src="/images/picture/tg-star.svg" />
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </>
    );
};
