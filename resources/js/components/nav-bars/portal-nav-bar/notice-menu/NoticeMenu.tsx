import React, { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
interface NoticeMenu {
    onOpen: () => void;
    open: boolean;
    onClose: () => void;
}
export const NoticeMenu: React.FC<NoticeMenu> = ({ open, onOpen, onClose }) => {
    const { t } = useTranslation();
    const anchorRef = useRef(null);
    const user = useSelector((state: StoreData) => state.main.user);
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
                                    {user.notices.length}
                                </Typography>
                            </Stack>
                        </Box>
                        <Divider />
                    </MenuPopover>
                </Fragment>
            )}
        </Fragment>
    );
};
