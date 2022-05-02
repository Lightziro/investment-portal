import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
interface ConfirmAction {
    state: boolean;
    onCancelClick: () => void;
    onConfirmClick: (id: number) => void;
    description?: string;
    title: string;
    id: number;
}
export const ConfirmAction: React.FC<ConfirmAction> = ({
    onConfirmClick,
    description,
    onCancelClick,
    state,
    title,
    id,
}) => {
    const { t } = useTranslation();
    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={state}
            onClose={onCancelClick}
        >
            <DialogTitle id="alert-dialog-title">{t(title)}</DialogTitle>
            {description && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onCancelClick}>{t("No")}</Button>
                <Button onClick={() => onConfirmClick(id)} autoFocus>
                    {t("Yes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
