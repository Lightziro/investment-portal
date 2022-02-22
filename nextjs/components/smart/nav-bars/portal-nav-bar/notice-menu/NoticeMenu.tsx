import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notice, StoreData } from "../../../../../ts/types/redux/store.types";
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { useTranslation } from "react-i18next";
import { viewNotice } from "../../../../../redux/actions/mainActions";
import classes from "../../NavBars.module.scss";
import { NoticeItem } from "../notice-item/NoticeItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "antd";

interface NoticeMenu {
    onOpen: () => void;
    open: boolean;
    onClose: () => void;
}

export const NoticeMenu: React.FC<NoticeMenu> = ({ open, onOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const user = useSelector((state: StoreData) => state.user);
    const onViewNotice = (notice: Notice) => {
        if (!notice.viewed) {
            dispatch(viewNotice(notice.id));
        }
    };
    const countNotView = (): number => {
        return user.notices.filter((notice) => !notice.viewed).length;
    };
    return (
        <Fragment>
            {user && (
                <Fragment>
                    <IconButton
                        ref={anchorRef}
                        sx={{ p: 0, width: 44, height: 44 }}
                        onClick={onOpen}
                    >
                        <Badge color="blue" count={countNotView()}>
                            <NotificationsNoneIcon width={24} height={24} />
                        </Badge>
                    </IconButton>
                    <MenuPopover
                        open={open}
                        onClose={onClose}
                        anchorEl={anchorRef.current}
                        sx={{ width: 220 }}
                    >
                        <Box padding={1}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                justifyContent="space-between"
                            >
                                <Typography variant="body2">
                                    {t("All Notification")}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.countNotices}
                                >
                                    {countNotView()}
                                </Typography>
                            </Stack>
                        </Box>
                        <Divider />
                        <Grid
                            justifyContent="flex-start"
                            direction="column"
                            container
                        >
                            {user.notices.map((notice) => (
                                <NoticeItem
                                    key={notice.id}
                                    onViewNotice={() => onViewNotice(notice)}
                                    notice={notice}
                                />
                            ))}
                        </Grid>
                        <button className={classes.btnAllNotices}>
                            <span>Show all</span>
                        </button>
                    </MenuPopover>
                </Fragment>
            )}
        </Fragment>
    );
};
