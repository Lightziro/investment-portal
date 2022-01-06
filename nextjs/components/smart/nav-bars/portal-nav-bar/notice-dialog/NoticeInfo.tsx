import React from "react";
import { Notice } from "../../../../../ts/types/redux/store.types";
import { Divider, Typography } from "@mui/material";
interface NoticeInfo {
    notice: Notice;
    onViewNotice: () => void;
}
import moment from "moment";
export const NoticeInfo: React.FC<NoticeInfo> = ({ notice, onViewNotice }) => {
    return (
        <div className="notice-item" onMouseEnter={onViewNotice}>
            <Typography variant="caption">
                {moment(notice.created).fromNow()}
            </Typography>
            <div className={`notice-header ${!notice.viewed && "not-view"}`}>
                <span className="notice-item-title">{notice.title}</span>
            </div>
            <div
                className="notice-item-description"
                dangerouslySetInnerHTML={{ __html: notice.description }}
            />
            <Divider />
        </div>
    );
};
