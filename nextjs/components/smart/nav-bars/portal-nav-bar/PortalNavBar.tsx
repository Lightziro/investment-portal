import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LanguageMenu } from "./language-menu/LanguageMenu";
import { NoticeMenu } from "./notice-menu/NoticeMenu";
import classes from "../../../../styles/nav-bar.module.scss";
import { ProfileMenu } from "./profile-menu/ProfileMenu";
import { SearchEntities } from "./search-entities/SearchEntities";

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
        <header className={classes.portalNavBar}>
            {/*{backdrop && <div className={classes.backdropSearch} />}*/}
            <div className={classes.navBarWrapper}>
                <div className={classes.logoWrapper}>
                    <Link href="/" passHref>
                        <img src="/images/logo/logo-base.png" />
                    </Link>
                </div>
                <SearchEntities />
                <div className={classes.emptyBlock} />
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
