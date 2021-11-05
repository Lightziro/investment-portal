import React, { Fragment, useRef } from "react";
import { MenuPopover } from "../menu-popover/MenuPopover";
import { LIST_LANGUAGE } from "../../../../ts/consts/settings/settings.consts";
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
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
    const language = useSelector((state: StoreData) => state.main.language);
    const anchorRef = useRef(null);
    const { i18n } = useTranslation();
    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        onClose();
    };
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ p: 0, width: 44, height: 44 }}
                onClick={onOpen}
            >
                <img src="/image/picture/language-icons/ic_flag_en.svg" />
            </IconButton>
            <MenuPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorRef.current}
            >
                {LIST_LANGUAGE.map((language) => (
                    <MenuItem
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
