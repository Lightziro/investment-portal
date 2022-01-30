import React, { Fragment, useRef } from "react";
import { IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { useDispatch } from "react-redux";
import { UserAvatar } from "../../../../simple/user-avatar/UserAvatar";
import { LoginMenu } from "./LoginMenu";
import { NoLoginMenu } from "./NoLoginMenu";
import { logoutUser } from "../../../../../redux/actions/userActions";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";

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
    const user = useRootSelector((store) => store.user);
    const dispatch = useDispatch();
    const handleExit = () => {
        dispatch(logoutUser());
        onClose();
    };
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ p: 0, width: 44, height: 44 }}
                onClick={onOpen}
            >
                <UserAvatar avatar={user ? user.avatar : null} />
            </IconButton>
            <MenuPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                {user ? (
                    <LoginMenu user={user} handleExit={handleExit} />
                ) : (
                    <NoLoginMenu />
                )}
            </MenuPopover>
        </Fragment>
    );
};
