import React, { useEffect } from "react";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { Paper, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUserNotices } from "../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { UserNoticeModel } from "../../../ts/types/entity/user.types";
import { List } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import classes from "../PersonalAccount.module.scss";
import { getViewClass } from "../../../utils/user/user-classes";
import classNames from "classnames";

export const NoticesPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserNotices());
    }, []);
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    const { list, loading } = useRootSelector((state) => state.account.notices);

    return (
        <Paper sx={{ p: 2 }}>
            <HeaderPage title="Notices">
                In this section you can view your notices
            </HeaderPage>
            <List
                itemLayout="horizontal"
                dataSource={list}
                loading={loading}
                renderItem={(item: UserNoticeModel) => (
                    <List.Item>
                        <List.Item.Meta
                            className={classNames(
                                classes.wrapperNotices,
                                getViewClass(classes.notView, item.viewed)
                            )}
                            title={
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <span>{item.title}</span>
                                    <span className={classes.date}>
                                        {moment(item.created_at).fromNow()}
                                    </span>
                                </Stack>
                            }
                            description={
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: item.description,
                                    }}
                                />
                            }
                        />
                    </List.Item>
                )}
            />
        </Paper>
    );
};
