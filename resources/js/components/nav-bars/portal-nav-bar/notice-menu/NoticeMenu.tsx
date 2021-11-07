import React, { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { Avatar, IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { LoginMenu } from "../profile-menu/LoginMenu";
import { NoLoginMenu } from "../profile-menu/NoLoginMenu";
import { Icon } from "@iconify/react";
interface NoticeMenu {
    onOpen: () => void;
    open: boolean;
    onClose: () => void;
}
export const NoticeMenu: React.FC<NoticeMenu> = ({ open, onOpen, onClose }) => {
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
                        {/*<Avatar src="/image/picture/avatar_default.jpg" />*/}
                    </IconButton>
                    <MenuPopover
                        open={open}
                        onClose={onClose}
                        anchorEl={anchorRef.current}
                        sx={{ width: 220 }}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};
