import React, { Fragment } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Notice, StoreData } from "../../../../ts/types/redux/store.types";
import { NoticeInfo } from "./NoticeInfo";
import { viewNotice } from "../../../../redux/actions/mainActions";

export const NoticeDialog: React.FC = () => {
    const dispatch = useDispatch();
    const notices = useSelector((state: StoreData) => state.main.user.notices);
    console.log(notices);
    const onViewNotice = (notice: Notice) => {
        if (!notice.viewed) {
            dispatch(viewNotice(notice.id));
        }
    };
    return (
        <Grid justifyContent="flex-start" direction="column" container>
            {notices.map((notice) => (
                <NoticeInfo
                    onViewNotice={() => onViewNotice(notice)}
                    notice={notice}
                />
            ))}
        </Grid>
    );
};
