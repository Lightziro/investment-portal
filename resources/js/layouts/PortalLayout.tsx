import React, { Fragment } from "react";
import { PortalNavBar } from "../components/nav-bars/portal-nav-bar/PortalNavBar";
import { Outlet } from "react-router-dom";

export const PortalLayout: React.FC = () => {
    return (
        <Fragment>
            <PortalNavBar />
            <div className="page-wrapper">
                <Outlet />
            </div>
        </Fragment>
    );
};
