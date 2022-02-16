import React from "react";

interface Dialog {
    backdrop: boolean;
    handleShow: () => void;
    handleRemove: () => void;
}

export function useBackdrop(beforeHandle?: () => void): Dialog {
    const [backdrop, setBackdrop] = React.useState(false);

    const handleShow = () => {
        setBackdrop(true);
    };

    const handleRemove = () => {
        setBackdrop(false);
        beforeHandle?.();
    };

    return {
        backdrop,
        handleShow,
        handleRemove,
    };
}
