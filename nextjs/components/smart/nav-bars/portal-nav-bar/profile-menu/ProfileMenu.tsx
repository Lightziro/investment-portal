import React, { Fragment, useRef } from "react";
import { IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { StoreData } from "../../../../../ts/types/redux/store.types";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../../../simple/user-avatar/UserAvatar";
import { LoginMenu } from "./LoginMenu";
import { NoLoginMenu } from "./NoLoginMenu";
import { logoutUser } from "../../../../../redux/actions/userActions";

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
    const user = useSelector((state: StoreData) => state.user);
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
                <UserAvatar user={user ? user.avatar : null} />
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
