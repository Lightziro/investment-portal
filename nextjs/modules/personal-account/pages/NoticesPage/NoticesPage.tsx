import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/header-page/HeaderPage";
import { Paper, Skeleton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUserNotices } from "../../../../redux/actions/personal-account/userPredictionActions";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { UserNoticeModel } from "../../../../ts/types/entity/user.types";
import { List } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import classes from "../../PersonalAccount.module.scss";
import { getViewClass } from "../../../../utils/user/user-classes";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./NoticesPage.module.scss";
import { viewNotice } from "../../../../redux/actions/mainActions";

export const NoticesPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserNotices(1));
    }, []);
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    const { list, loading, total, page } = useRootSelector(
        (state) => state.account.notices
    );

    const loadHasMore = () => {
        dispatch(fetchUserNotices(page));
    };

    const onViewNotice = (notice: UserNoticeModel) => {
        if (!notice.viewed) {
            dispatch(viewNotice(notice.notice_id));
        }
    };

    return (
        <>
            <div id="scrollableDiv" className={styles.fixed}>
                <InfiniteScroll
                    dataLength={list.length}
                    next={loadHasMore}
                    hasMore={list.length < total}
                    loader={<Skeleton height={70} />}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={(item: UserNoticeModel) => (
                            <List.Item onClick={() => onViewNotice(item)}>
                                <List.Item.Meta
                                    className={classNames(
                                        classes.wrapperNotices,
                                        getViewClass(
                                            classes.notView,
                                            item.viewed
                                        )
                                    )}
                                    title={
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <span>{item.title}</span>
                                            <span className={classes.date}>
                                                {moment(
                                                    item.created_at
                                                ).fromNow()}
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
                </InfiniteScroll>
            </div>
        </>
    );
};
