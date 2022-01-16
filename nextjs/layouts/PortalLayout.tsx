import React, { Fragment } from "react";
import { PortalNavBar } from "../components/smart/nav-bars/portal-nav-bar/PortalNavBar";

interface PortalLayout {
    showNavBar?: boolean;
}
export const PortalLayout: React.FC<PortalLayout> = ({
    children,
    showNavBar = true,
}) => {
    return (
        <Fragment>
            {showNavBar && <PortalNavBar />}
            <div className="wrapper-site">
                <div className="page-wrapper">{children}</div>
            </div>
        </Fragment>
    );
};
