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
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { viewNotice } from "../../../../../redux/actions/mainActions";
import { NoticeInfo } from "../notice-dialog/NoticeInfo";
interface NoticeMenu {
    onOpen: () => void;
    open: boolean;
    onClose: () => void;
}
export const NoticeMenu: React.FC<NoticeMenu> = ({ open, onOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const user = useSelector((state: StoreData) => state.main.user);
    const onViewNotice = (notice: Notice) => {
        if (!notice.viewed) {
            dispatch(viewNotice(notice.id));
        }
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
                        <Icon
                            icon="ant-design:bell-outlined"
                            width={24}
                            height={24}
                        />
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
                                    className="count-notices"
                                >
                                    {
                                        user.notices.filter(
                                            (notice) => !notice.viewed
                                        ).length
                                    }
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
                                <NoticeInfo
                                    onViewNotice={() => onViewNotice(notice)}
                                    notice={notice}
                                />
                            ))}
                        </Grid>
                    </MenuPopover>
                </Fragment>
            )}
        </Fragment>
    );
};
