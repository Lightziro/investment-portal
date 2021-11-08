import React from "react";

import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { MENU_ADMIN } from "../../../config/menu-items";
import { useTranslation } from "react-i18next";

export const MenuItemsSection: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="bar-section-menu">
            <ul className="menu-items">
                {MENU_ADMIN.map((route) => (
                    <NavLink className="admin-menu-item" to={route.url}>
                        <div className="item-menu-icon">
                            <Icon
                                icon={route.logo.name}
                                width="22"
                                height="22"
                            />
                        </div>
                        <span>{t(route.text)}</span>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};
