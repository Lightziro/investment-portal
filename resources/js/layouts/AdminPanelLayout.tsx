import React from "react";
import { Outlet } from "react-router-dom";
import { AdminToolBar } from "../components/admin-tool-bar/AdminToolBar";

export const AdminPanelLayout: React.FC = () => {
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
