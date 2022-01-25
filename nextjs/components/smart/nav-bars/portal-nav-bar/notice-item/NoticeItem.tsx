import React from "react";
import { Notice } from "../../../../../ts/types/redux/store.types";
import { Divider, Typography } from "@mui/material";
import classes from "../../NavBars.module.scss";
import moment from "moment";
interface NoticeItem {
    notice: Notice;
    onViewNotice: () => void;
}

export const NoticeItem: React.FC<NoticeItem> = ({ notice, onViewNotice }) => {
    return (
        <div className={classes.noticeItem} onMouseEnter={onViewNotice}>
            <Typography variant="caption">
                {moment(notice.created).fromNow()}
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
