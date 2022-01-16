import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { MENU_ADMIN } from "../../../../../config/menu-items";
import Link from "next/link";
import classes from "../AdminToolBar.module.scss";
import { useRouter } from "next/router";

export const MenuItemsSection: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <div className="bar-section-menu">
            <ul className={classes.menuItems}>
                {MENU_ADMIN.map((route, i) => (
                    <Link href={route.url} passHref key={i}>
                        <div
                            className={`${classes.adminMenuItem} ${
                                router.pathname === route.url
                                    ? classes.active
                                    : ""
                            }`}
                        >
                            <div className={classes.itemMenuIcon}>
                                <Icon
                                    icon={route.logo.name}
                                    width="22"
                                    height="22"
                                />
                            </div>
                            <span>{t(route.text)}</span>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
