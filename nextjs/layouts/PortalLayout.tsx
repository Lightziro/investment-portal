import React, { Fragment, useEffect } from "react";
import { PortalNavBar } from "../components/smart/nav-bars/portal-nav-bar/PortalNavBar";
import { Footer } from "../components/smart/footer/Footer";
import { init } from "@telegram-apps/sdk";
import { isTMA } from "@telegram-apps/bridge";
import dynamic from "next/dynamic";

interface PortalLayout {
    showNavBar?: boolean;
    children: React.ReactNode;
}
export const PortalLayout: React.FC<PortalLayout> = ({
    children,
    showNavBar = true,
}) => {
    useEffect(() => {
        if (isTMA()) {
            init();
        }
    }, []);

    const BottomSheetComponent = dynamic(
        () => import("../components/smart/bottom-sheet/BottomSheet"),
        {
            ssr: false,
        }
    );

    return (
        <Fragment>
            {showNavBar && <PortalNavBar />}
            <BottomSheetComponent />
            <div className="wrapper-site container">
                <div className="page-wrapper">{children}</div>
            </div>
            {/*<Footer />*/}
        </Fragment>
    );
};
