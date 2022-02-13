import React, { Fragment, useState, MouseEvent } from "react";
import { Divider, IconButton, Popover, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";

interface HeaderPage {
    title: string;
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
                <IconButton color="primary" size="large" component="span">
                    <InfoOutlinedIcon onClick={handleOpen} />
                </IconButton>
            </Stack>
            <Divider />
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
                <div className="p-2">{children}</div>
            </Popover>
        </Fragment>
    );
};
