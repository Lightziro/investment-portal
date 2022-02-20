import React, { Fragment, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { MenuPopover } from "../menu-popover/MenuPopover";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface ExchangeTimeMenu {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const ExchangeTimeMenu: React.FC<ExchangeTimeMenu> = ({
    open,
    onClose,
    onOpen,
}) => {
    const anchorRef = useRef(null);
    return (
        <Fragment>
            <IconButton
                ref={anchorRef}
                sx={{ width: 44, height: 44 }}
                onClick={onOpen}
            >
                <AccessTimeIcon width={24} height={24} />
            </IconButton>
            <MenuPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                <Box padding={1}>123</Box>
            </MenuPopover>
        </Fragment>
    );
};
