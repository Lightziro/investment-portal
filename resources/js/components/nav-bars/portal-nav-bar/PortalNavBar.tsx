import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { LanguageMenu } from "./language-menu/LanguageMenu";
import { ProfileMenu } from "./profile-menu/ProfileMenu";
import { NoticeMenu } from "./notice-menu/NoticeMenu";

export const PortalNavBar: React.FC = () => {
    const [open, setOpen] = useState({
        language: false,
        notice: false,
        profile: false,
    });
    const handleOpen = (state: boolean, name: string) => {
        setOpen({ ...open, [name]: state });
    };

    return (
        <header className="portal-nav-bar">
            <div className="nav-bar-wrapper">
                <Box display="flex" width={228}>
                    <Link to="/">
                        <div className="nav-bar-portal-logo">
                            <img src="/image/logo/logo.svg" />
                        </div>
                    </Link>
                </Box>
                <div className="empty-block" />
                <LanguageMenu
                    open={open.language}
                    onClose={() => handleOpen(false, "language")}
                    onOpen={() => handleOpen(true, "language")}
                />
                <NoticeMenu
                    onClose={() => handleOpen(false, "notice")}
                    onOpen={() => handleOpen(true, "notice")}
                    open={open.notice}
                />
                <ProfileMenu
                    open={open.profile}
                    onOpen={() => handleOpen(true, "profile")}
                    onClose={() => handleOpen(false, "profile")}
                />
            </div>
        </header>
    );
};
