import React from "react";
import { Divider, Typography } from "@mui/material";
import classes from "../../NavBars.module.scss";
import moment from "moment";
import { UserNoticeModel } from "../../../../../ts/types/entity/user.types";
interface NoticeItem {
    notice: UserNoticeModel;
    onViewNotice: () => void;
}

export const NoticeItem: React.FC<NoticeItem> = ({ notice, onViewNotice }) => {
    return (
        <div className={classes.noticeItem} onMouseEnter={onViewNotice}>
            <Typography variant="caption">
                {moment(notice.created_at).fromNow()}
            </Typography>
            <div
                className={`${classes.noticeHeader} ${
                    !notice.viewed ? classes.notView : ""
                }`}
            >
                <span className="notice-item-title">{notice.title}</span>
            </div>
            <div
                className={classes.noticeItemDescription}
                dangerouslySetInnerHTML={{ __html: notice.description }}
            />
            <Divider />
        </div>
    );
};
