import React from "react";
import { Link, NavLink } from "react-router-dom";
import { routeConfig } from "../../config/route.config";
import { Icon } from "@iconify/react";
import { LogoSection } from "./admin-panel-section/LogoSection";
import { UserSection } from "./admin-panel-section/UserSection";
import { MenuItemsSection } from "./admin-panel-section/MenuItemsSection";

export const AdminToolBar: React.FC = () => {
    return (
        <div className="admin-bar-wrapper">
            <div className="paper-bar">
                <LogoSection />
                <UserSection />
                <MenuItemsSection />
            </div>
        </div>
    );
};
