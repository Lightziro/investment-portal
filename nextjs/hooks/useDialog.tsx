import React from "react";

interface Dialog {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

export function useDialog(beforeHandle?: () => void): Dialog {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        beforeHandle?.();
    };

    return {
        open,
        handleOpen,
        handleClose,
    };
}
