import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../../ts/types/redux/store.types";
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
import { Badge, Button } from "antd";
import { LinkWrapper } from "../../../../simple/link/Link";
import { UserNoticeModel } from "../../../../../ts/types/entity/user.types";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";

interface NoticeMenu {
    onOpen: () => void;
    open: boolean;
    onClose: () => void;
}

export const NoticeMenu: React.FC<NoticeMenu> = ({ open, onOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const { data } = useRootSelector((state: StoreData) => state.user);
    const onViewNotice = (notice: UserNoticeModel) => {
        if (!notice.viewed) {
            dispatch(viewNotice(notice.notice_id));
        }
    };
    const countNotView = (): number => {
        return data.notices.filter((notice) => !notice.viewed).length;
    };
    return (
        <Fragment>
            {data && (
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
                            {data.notices.map((notice) => (
                                <NoticeItem
                                    key={notice.notice_id}
                                    onViewNotice={() => onViewNotice(notice)}
                                    notice={notice}
                                />
                            ))}
                        </Grid>
                        <LinkWrapper href="/personal-account/notices">
                            <Stack sx={{ my: 1 }} alignItems="center">
                                <Button block type="primary">
                                    {t("Show all")}
                                </Button>
                            </Stack>
                        </LinkWrapper>
                    </MenuPopover>
                </Fragment>
            )}
        </Fragment>
    );
};
