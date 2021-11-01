import React from "react";
import { AdminToolBar } from "../../components/admin-tool-bar/AdminToolBar";
import { Outlet } from "react-router-dom";

export const Admin: React.FC = () => {
    return (
        <div className="admin-container">
            <header className="header-panel">
                <div className="search-logo"></div>
            </header>
            <AdminToolBar />
            <div className="admin-section-wrapper">
                <Outlet />
            </div>
        </div>
    );
};
