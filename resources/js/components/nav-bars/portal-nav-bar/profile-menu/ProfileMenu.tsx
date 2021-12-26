import React, { Fragment, useRef } from "react";
import { Avatar, IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { useDispatch, useSelector } from "react-redux";
import { NoLoginMenu } from "./NoLoginMenu";
import { LoginMenu } from "./LoginMenu";
import { exitUser } from "../../../../redux/actions/mainActions";
import { UserAvatar } from "../../../simple/user-avatar/UserAvatar";

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
    const dispatch = useDispatch();
    const handleExit = () => {
        dispatch(exitUser());
        onClose();
    };
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ p: 0, width: 44, height: 44 }}
                onClick={onOpen}
            >
                <UserAvatar user={user} />
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
