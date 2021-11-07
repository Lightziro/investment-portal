import { MenuItems } from "../ts/types/menu-items.types";

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
export const MENU_AUTH: MenuItems[] = [
    {
        text: "Profile",
        link: "/profile",
        icon: "eva:clipboard-fill",
    },
];
export const MENU_LANGUAGE = [
    {
        value: "en",
        text: "English",
        icon: "/image/picture/language-icons/en-flag.svg",
    },
    {
        value: "ru",
        text: "Russia",
        icon: "/image/picture/language-icons/ru-flag.svg",
    },
];
