import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { stageName } from "../../../utils/create-idea";
import { PickCompanyStage } from "./stages/pick-company/PickCompanyStage";
import { SelectTypeAnalyticsStage } from "./stages/select-type-analytics/SelectTypeAnalyticsStage";
interface CreateIdeaDialog {
    open: boolean;
    setOpen: () => void;
}
export const CreateIdeaDialog: React.FC<CreateIdeaDialog> = ({
    open,
    setOpen,
}) => {
    const stage = useSelector(
        (state: StoreData) => state.admin.createIdea.stage
    );
    const { t } = useTranslation();

    const componentStage = () => {
        switch (stage) {
            case 1:
                return <PickCompanyStage />;
            case 2:
                return <SelectTypeAnalyticsStage />;
        }
    };
    return (
        <Dialog open={open} onClose={setOpen}>
            <DialogTitle>
                {t(`Stage ${stage} of 5`)}. {t(stageName[stage])}
            </DialogTitle>
            {componentStage()}
        </Dialog>
    );
};
