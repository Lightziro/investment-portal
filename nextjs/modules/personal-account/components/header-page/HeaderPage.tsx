import React, { Fragment, useState, MouseEvent } from "react";
import { Divider, IconButton, Popover, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import classes from "../../PersonalAccount.module.scss";

interface HeaderPage {
    title: string;
    children?: string;
}

export const HeaderPage: React.FC<HeaderPage> = ({ title, children }) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);

    const handleOpen = (event: MouseEvent<SVGElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Stack direction="row" justifyContent="space-between">
                <h3>{t(title)}</h3>
                {children && (
                    <IconButton
                        color="primary"
                        component="span"
                        size="large"
                        onClick={(e) => handleOpen(e)}
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                )}
            </Stack>
            {children && (
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <div className={`p-2 ${classes.headerContent}`}>
                        {t(children)}
                    </div>
                </Popover>
            )}
        </Fragment>
    );
};
