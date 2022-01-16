import React from "react";
import classes from "../AdminToolBar.module.scss";
import Link from "next/link";

export const LogoSection: React.FC = () => {
    return (
        <div className={classes.headerBarLogo}>
            <Link href="/" passHref>
                <img className={classes.logoLink} src="/image/logo/logo.svg" />
            </Link>
        </div>
    );
};
