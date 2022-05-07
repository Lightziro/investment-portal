import React from "react";
import { MenuItems } from "../ts/types/menu-items.types";
import { Icon } from "@iconify/react";

export const MENU_NO_AUTH: MenuItems[] = [
    {
        text: "Log in",
        icon: "twemoji:rocket",
        link: "/auth",
    },
    {
        text: "Sign in",
        icon: "twemoji:globe-showing-europe-africa",
        link: "/register",
    },
];
export const menuAuth = (userId: number): MenuItems[] => {
    return [
        {
            text: "Profile",
            link: `/profile/${userId}`,
            icon: "twemoji:blue-book",
        },
        {
            text: "Personal account",
            link: `/personal-account`,
            icon: "fxemoji:personalcomputer",
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
export const MENU_PERSONAL_ACCOUNT = [
    {
        label: "Main",
        url: "/personal-account",
    },
    {
        label: "My predictions",
        url: "/personal-account/predictions",
    },
    {
        label: "Notices",
        url: "/personal-account/notices",
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
        text: "Stats",
        url: "/admin/stats",
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
export const SORT_IDEAS = [
    {
        label: "By default",
        value: "idea_id",
    },
    {
        label: "By name",
        value: "company__name",
    },
    {
        label: "High income",
        value: "possible_profit__desc",
    },
    {
        label: "Low income",
        value: "possible_profit__asc",
    },
];
export const SORT_ARTICLES = [
    {
        label: "By default",
        value: "article_id",
    },
    {
        label: "By name",
        value: "title",
    },
];
export const FOOTER_MENU = [
    {
        label: "Home page",
        value: "/",
    },
    {
        label: "Investment ideas",
        value: "/investment-idea/all",
    },
    {
        label: "Articles",
        value: "/article/all",
    },
];
