import React, { Fragment, useRef } from "react";
import { Avatar, IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { useSelector } from "react-redux";
import { NoLoginMenu } from "./NoLoginMenu";

interface ProfileMenu {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const ProfileMenu: React.FC<ProfileMenu> = ({
    open,
    onOpen,
    onClose,
}) => {
    const anchorRef = useRef(null);
    const user = useSelector((state: StoreData) => state.main.user);
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ p: 0, width: 44, height: 44 }}
                onClick={onOpen}
            >
                <Avatar src="/image/picture/avatar_default.jpg" />
            </IconButton>
            <MenuPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                {user ? <div>Testick</div> : <NoLoginMenu />}
            </MenuPopover>
        </Fragment>
    );
};
