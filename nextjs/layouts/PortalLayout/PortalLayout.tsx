import React, { Fragment, useEffect } from "react";
import { PortalNavBar } from "../../components/smart/nav-bars/portal-nav-bar/PortalNavBar";
import { Footer } from "../../components/smart/footer/Footer";
import { init } from "@telegram-apps/sdk";
import { isTMA } from "@telegram-apps/bridge";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setCloseSheet } from "../../redux/actions/sheetActions";
import styles from "./PortalLayout.module.scss";
import { useRootSelector } from "../../hooks/useTypeSelector";

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
        () => import("../../components/smart/bottom-sheet/BottomSheet"),
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
            <CustomBackdrop />
        </Fragment>
    );
};

const CustomBackdrop: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpenSheet } = useRootSelector((state) => state.sheet);
    if (!isOpenSheet) {
        return null;
    }
    return (
        <div
            className={styles.customBackdrop}
            onClick={() => dispatch(setCloseSheet())}
        />
    );
};
