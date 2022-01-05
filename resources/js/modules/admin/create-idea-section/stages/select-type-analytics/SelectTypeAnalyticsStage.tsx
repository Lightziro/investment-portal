import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../../../../nextjs/ts/types/redux/store.types";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { ActionsDialog } from "../../ActionsDialog";
import { useTranslation } from "react-i18next";
import { OPTIONS_NEWS_ANALYZE } from "../../../../../../../nextjs/config/menu-items";
import { initialParamsAnalyze } from "../../../../../../../nextjs/ts/init/other/other.init";
import { FormParamsAnalyze } from "../../../../../../../nextjs/ts/types/forms/form.types";
import { sendToAnalyze } from "../../../../../../../nextjs/redux/actions/admin/createIdeaActions";

export const SelectTypeAnalyticsStage: React.FC = () => {
    const dispatch = useDispatch();
    const [params, setParams] =
        useState<FormParamsAnalyze>(initialParamsAnalyze);
    const changeParams = (event: SelectChangeEvent) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };
    const company = useSelector(
        (state: StoreData) => state.admin.createIdea.selectedCompany
    );
    const { t } = useTranslation();
    const handleSendToAnalyze = () => {
        dispatch(sendToAnalyze({ ...params, company }));
    };
    return (
        <Fragment>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>{t("Period news analysis")}</InputLabel>
                <Select
                    value={params.monthPeriod.toString()}
                    name="monthPeriod"
                    onChange={changeParams}
                >
                    {OPTIONS_NEWS_ANALYZE.map((option) => (
                        <MenuItem value={option.value}>
                            {t(option.label)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>With label + helper text</FormHelperText>
            </FormControl>
            <ActionsDialog
                textSuccessButton={"Send to analyze"}
                handler={handleSendToAnalyze}
            />
        </Fragment>
    );
};
