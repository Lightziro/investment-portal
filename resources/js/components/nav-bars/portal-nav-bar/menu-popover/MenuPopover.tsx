import React from "react";
import { Popover } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const ArrowStyle = styled('span')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        top: -7,
        zIndex: 1,
        width: 12,
        right: 20,
        height: 12,
        content: "''",
        position: 'absolute',
        borderRadius: '0 0 4px 0',
        transform: 'rotate(-135deg)',
        background: 'white',
        borderRight: "1px solid rgba(145, 158, 171, 0.12)",
        borderBottom: "1px solid rgba(145, 158, 171, 0.12)"
    }
}));

interface MenuPopover {
    open: boolean
    onClose: () => void
    anchorEl: any
    sx?: object
}
export const MenuPopover: React.FC<MenuPopover> = ({ children, sx, ...other }) => {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    p: 1,
                    ml: 0.5,
                    overflow: 'inherit',
                    boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 20px 40px -4px",
                    width: 200,
                    border: "1px solid rgba(145, 158, 171, 0.08)",
                    ...sx
                }
            }}
            {...other}
        >
            <ArrowStyle className="arrow" />

            {children}
        </Popover>
    );
}
