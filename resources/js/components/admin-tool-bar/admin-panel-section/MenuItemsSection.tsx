import React from "react";
import { routeConfig } from "../../../config/route.config";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

export const MenuItemsSection: React.FC = () => {
    return (
        <div className="bar-section-menu">
            <ul className="menu-items">
                {routeConfig.map((route) => (
                    <NavLink className="admin-menu-item" to={route.url}>
                        <div className="item-menu-icon">
                            <Icon
                                icon={route.logo.name}
                                width="22"
                                height="22"
                            />
                        </div>
                        <span>{route.text}</span>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};
