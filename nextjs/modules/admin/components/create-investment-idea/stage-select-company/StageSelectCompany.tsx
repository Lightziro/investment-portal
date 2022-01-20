import React from "react";
import { Button, Stack } from "@mui/material";
import { AutoCompleteCompanies } from "../auto-complete-companies/AutoCompleteCompanies";
import { useTranslation } from "react-i18next";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { CreateIdeaStage } from "../../../../../ts/enums/investment-idea.enum";
import { useDispatch } from "react-redux";
import {
    changeStageCreateIdea,
    fetchCompanies,
    setCompanyIdea,
} from "../../../../../redux/actions/admin/adminIdeaActions";
import { alertInfo } from "../../../../../redux/actions/alertActions";

export const StageSelectCompany: React.FC = () => {
    const { t } = useTranslation();
    const { stage, companies, loadInput, selectedCompany } = useRootSelector(
        (state) => state.admin.createIdea
    );
    const dispatch = useDispatch();
    const handleNextStage = () => {
        if (!selectedCompany) {
            dispatch(alertInfo("Please, select company"));
            return;
        }
        dispatch(changeStageCreateIdea(CreateIdeaStage.SettingsAnalytics));
    };
    const isSettingsStage = stage === CreateIdeaStage.SettingsAnalytics;
    return (
        <Stack justifyContent="center">
            <AutoCompleteCompanies
                changeCompany={(e) => dispatch(setCompanyIdea(e))}
                loading={loadInput}
                handleChange={(e) => dispatch(fetchCompanies(e.target.value))}
                disable={isSettingsStage}
                items={companies}
            />
            {!isSettingsStage && (
                <Button
                    sx={{ mt: 1 }}
                    onClick={handleNextStage}
                    variant="contained"
                >
                    {t("Next stage")}
                </Button>
            )}
        </Stack>
    );
};
