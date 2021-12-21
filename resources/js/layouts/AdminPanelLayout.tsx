import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminToolBar } from "../components/admin-tool-bar/AdminToolBar";
import { useSelector } from "react-redux";
import { StoreData } from "../ts/types/redux/store.types";

export const AdminPanelLayout: React.FC = () => {
    const navigate = useNavigate();
    const { role } = useSelector((state: StoreData) => state.main.user);

    useEffect(() => {}, []);
    if (role !== "admin") {
        console.log("REDIRECT");
        navigate("/");
    }
    return (
        <div className="admin-container">
            <header className="header-panel">
                <div className="search-logo" />
            </header>
            <AdminToolBar />
            <div className="admin-section-wrapper">
                <Outlet />
            </div>
        </div>
    );
};
