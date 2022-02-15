import React, { Fragment, useRef } from "react";
import { MenuPopover } from "../menu-popover/MenuPopover";
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { MENU_LANGUAGE } from "../../../../../config/menu-items";

interface LanguageMenu {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export const LanguageMenu: React.FC<LanguageMenu> = ({
    open,
    onClose,
    onOpen,
}) => {
    const anchorRef = useRef(null);
    const { i18n } = useTranslation();
    const handleChangeLanguage = (language: string) => {
        if (language !== i18n.language) {
            i18n.changeLanguage(language);
        }
        onClose();
    };
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ p: 0, width: 44, height: 44 }}
                onClick={onOpen}
            >
                <img
                    src={`/images/picture/language-icons/${i18n.language}-flag.svg`}
                />
            </IconButton>
            <MenuPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorRef.current}
            >
                {MENU_LANGUAGE.map((language) => (
                    <MenuItem
                        key={language.value}
                        id={language.value}
                        onClick={() => handleChangeLanguage(language.value)}
                        selected={language.value === i18n.language}
                    >
                        <ListItemIcon>
                            <img src={language.icon} />
                        </ListItemIcon>
                        <ListItemText>{language.text}</ListItemText>
                    </MenuItem>
                ))}
            </MenuPopover>
        </Fragment>
    );
};
