import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Icon } from "@iconify/react";
import { NoticeDialog } from "./notice-dialog/NoticeDialog";
import { LanguageMenu } from "./language-menu/LanguageMenu";

export const PortalNavBar: React.FC = () => {
    const [open, setOpen] = useState({
        language: false,
        notice: false,
    });
    const handleOpen = (state: boolean, name: string) => {
        setOpen({ ...open, [name]: state });
    };
    const user = useSelector((state: StoreData) => state.main.user);

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
                <div className="nav-bar-portal-user">
                    {/*{user && (*/}
                    {/*    <Fragment>*/}
                    {/*        <Box marginRight={3}>*/}
                    {/*            <div*/}
                    {/*                onClick={() => setOpen(!open)}*/}
                    {/*                className="icon-wrapper"*/}
                    {/*            >*/}
                    {/*                <Icon*/}
                    {/*                    icon="ant-design:bell-outlined"*/}
                    {/*                    width={24}*/}
                    {/*                    height={24}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </Box>*/}
                    {/*        <NoticeDialog state={open} />*/}
                    {/*    </Fragment>*/}
                    {/*)}*/}
                    <Grid
                        justifyContent="center"
                        direction="row"
                        container
                        alignItems="center"
                        className="nav-bar-user-avatar"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/image/picture/avatar_default.jpg"
                        />
                    </Grid>
                </div>
            </div>
        </header>
    );
};
