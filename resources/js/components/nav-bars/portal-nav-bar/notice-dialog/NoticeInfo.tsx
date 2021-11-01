import React from "react";
import { Notice } from "../../../../ts/types/redux/store.types";
import { Divider } from "@mui/material";
interface NoticeInfo {
    notice: Notice;
    onViewNotice: () => void;
}
import moment from "moment";
export const NoticeInfo: React.FC<NoticeInfo> = ({ notice, onViewNotice }) => {
    return (
        <div className="notice-item" onMouseEnter={onViewNotice}>
            <div className={`notice-header ${!notice.viewed && "not-view"}`}>
                <span className="notice-item-title">{notice.title}</span>
                <span>{moment(notice.created).fromNow()}</span>
            </div>
            <div className="notice-item-description">{notice.description}</div>
            <Divider />
        </div>
    );
};
