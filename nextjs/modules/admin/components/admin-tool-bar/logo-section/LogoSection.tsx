import React from "react";
import classes from "../AdminToolBar.module.scss";
import {LinkWrapper} from "../../../../../components/simple/link/Link";

export const LogoSection: React.FC = () => {
    return (
        <div className={classes.headerBarLogo}>
            <LinkWrapper href="/" passHref>
                <img
                    className={classes.logoLink}
                    src="/images/logo/logo-hub.png"
                />
            </LinkWrapper>
        </div>
    );
};
