import React from "react";
import { MenuItems } from "../ts/types/menu-items.types";
import { Icon } from "@iconify/react";

export const MENU_NO_AUTH: MenuItems[] = [
    {
        text: "Log in",
        icon: "eva:corner-up-right-fill",
        link: "/auth",
    },
    {
        text: "Sign in",
        icon: "eva:person-add-fill",
        link: "/register",
    },
];
export const menuAuth = (userId: number): MenuItems[] => {
    return [
        {
            text: "Profile",
            link: `/profile/${userId}`,
            icon: "eva:clipboard-fill",
        },
    ];
};
export const MENU_LANGUAGE = [
    {
        value: "en",
        text: "English",
        icon: "/images/picture/language-icons/en-flag.svg",
    },
    {
        value: "ru",
        text: "Russia",
        icon: "/images/picture/language-icons/ru-flag.svg",
    },
];
export const AUTH_BY = [
    {
        value: "Facebook",
        icon: <Icon icon="cib:facebook-f" color="#1877f2" />,
    },
    {
        value: "Google",
        icon: <Icon icon="flat-color-icons:google" color="#1877f2" />,
    },
];
export const MENU_ADMIN = [
    {
        logo: {
            name: "bi:bar-chart-fill",
        },
        text: "Investment ideas",
        url: "/admin/investment-ideas",
    },
    {
        logo: {
            name: "bi:person-circle",
        },
        text: "Users",
        url: "/admin/users",
    },
    {
        logo: {
            name: "bi:clipboard-data",
        },
        text: "Smart Analytics",
        url: "/admin/smart-analytic",
    },
    {
        logo: {
            name: "ri:article-line",
        },
        text: "Articles",
        url: "/admin/articles",
    },
    {
        logo: {
            name: "carbon:location-company",
        },
        text: "Companies",
        url: "/admin/companies",
    },
];
export const OPTIONS_NEWS_ANALYZE = [
    {
        label: "3 Month",
        value: 3,
    },
    {
        label: "6 Month",
        value: 6,
    },
    {
        label: "12 Month",
        value: 12,
    },
];
