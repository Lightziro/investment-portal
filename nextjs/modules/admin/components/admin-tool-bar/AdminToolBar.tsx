import React from "react";
import classes from "./AdminToolBar.module.scss";
import { LogoSection } from "./logo-section/LogoSection";
import { UserSection } from "./user-section/UserSection";
import { MenuItemsSection } from "./menu-items-section/MenuItemsSection";

export const AdminToolBar: React.FC = () => {
    return (
        <div className={classes.toolBarWrapper}>
            <div className={classes.paperBar}>
                <LogoSection />
                <UserSection />
                <MenuItemsSection />
            </div>
        </div>
    );
};
