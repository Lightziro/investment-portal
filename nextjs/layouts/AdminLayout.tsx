import React from "react";
import classes from "../styles/layouts.module.scss";
import { AdminToolBar } from "../modules/admin/components/admin-tool-bar/AdminToolBar";

export const AdminLayout: React.FC = ({ children }) => {
    return (
        <div className={classes.adminContainer}>
            <header className={classes.headerPanel}>
                <div className="search-logo" />
            </header>
            <AdminToolBar />
            <div className={classes.adminSectionWrapper}>{children}</div>
        </div>
    );
};
