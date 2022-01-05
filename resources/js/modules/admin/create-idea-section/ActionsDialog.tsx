import React from "react";
import { Button, DialogActions } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../../nextjs/ts/types/redux/store.types";

interface ActionsDialog {
    handler: () => void;
    textSuccessButton?: string;
}
export const ActionsDialog: React.FC<ActionsDialog> = ({
    handler,
    textSuccessButton = "Next stage",
}) => {
    const { t } = useTranslation();
    return (
        <DialogActions>
            <Button>{t("Cancel")}</Button>
            <Button onClick={handler}>{t(textSuccessButton)}</Button>
        </DialogActions>
    );
};
