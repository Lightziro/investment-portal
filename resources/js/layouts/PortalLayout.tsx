import React, { Fragment } from "react";
import { PortalNavBar } from "../components/nav-bars/portal-nav-bar/PortalNavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";

export const PortalLayout: React.FC = () => {
    return (
        <Fragment>
            <PortalNavBar />
            <div className="page-wrapper">
                <Outlet />
            </div>
            <Footer />
        </Fragment>
    );
};
