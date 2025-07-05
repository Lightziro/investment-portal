import React from "react";
import { Divider, Typography } from "@mui/material";
import classes from "../../NavBars.module.scss";
import moment from "moment";
import { UserNoticeModel } from "../../../../../ts/types/entity/user.types";
import { getViewClass } from "../../../../../utils/user/user-classes";
import { useTranslation } from "react-i18next";
interface NoticeItem {
    notice: UserNoticeModel;
    onViewNotice: () => void;
}

export const NoticeItem: React.FC<NoticeItem> = ({ notice, onViewNotice }) => {
    const { t } = useTranslation();
    return (
        <div className={classes.noticeItem} onMouseEnter={onViewNotice}>
            <Typography variant="caption">
                {moment(notice.created_at).fromNow()}
            </Typography>
            <div
                className={`${classes.noticeHeader} ${getViewClass(
                    classes.notView,
                    notice.viewed
                )}`}
            >
                <span className="notice-item-title">{t(notice.title)}</span>
            </div>
            <div
                className={classes.noticeItemDescription}
                dangerouslySetInnerHTML={{ __html: notice.description }}
            />
            <Divider />
        </div>
    );
};
