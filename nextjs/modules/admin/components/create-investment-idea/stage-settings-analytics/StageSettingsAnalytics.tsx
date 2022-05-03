import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../../ts/types/redux/store.types";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { OPTIONS_NEWS_ANALYZE } from "../../../../../config/menu-items";
import { initialParamsAnalyze } from "../../../../../ts/init/other/other.init";
import { FormParamsAnalyze } from "../../../../../ts/types/forms/form.types";
import { Button } from "react-bootstrap";
import { changeStageCreateIdea } from "../../../../../redux/actions/admin/adminIdeaActions";
import { CreateIdeaStage } from "../../../../../ts/enums/investment-idea.enum";
import { useRouter } from "next/router";
import { axios } from "../../../../../utils/axios";
import {
    alertError,
    alertSuccess,
} from "../../../../../redux/actions/alertActions";
import { Entity } from "../../../../../ts/enums/other.enums";

export const StageSettingsAnalytics: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const router = useRouter();
    const [params, setParams] =
        useState<FormParamsAnalyze>(initialParamsAnalyze);
    const changeParams = (event: SelectChangeEvent) => {
        setParams({ ...params, [event.target.name]: event.target.value });
    };
    const { selectedCompany, stage } = useSelector(
        (state: StoreData) => state.admin.createIdea
    );
    if (stage !== CreateIdeaStage.SettingsAnalytics) {
        return null;
    }
    const handleSendToAnalyze = async () => {
        await axios
            .post(
                `${process.env.API_URL}/api/admin/${Entity.InvestmentIdea}/create`,
                {
                    ...params,
                    selectedCompany,
                }
            )
            .then((response) => {
                dispatch(
                    alertSuccess(
                        "You successfully created an idea, when a smart analytical analyzes, you will receive an alert"
                    )
                );
            })
            .catch((e) => dispatch(alertError(e.response.data.message)));
        await router.push("/admin/investment-ideas");
    };
    return (
        <Stack sx={{ mt: 2 }} direction="column">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>{t("Period news analysis")}</InputLabel>
                <Select
                    value={params.monthPeriod.toString()}
                    name="monthPeriod"
                    onChange={changeParams}
                >
                    {OPTIONS_NEWS_ANALYZE.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {t(option.label)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>With label + helper text</FormHelperText>
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
                <Button
                    onClick={() =>
                        dispatch(
                            changeStageCreateIdea(CreateIdeaStage.SelectCompany)
                        )
                    }
                    variant="secondary"
                >
                    {t("Prev stage")}
                </Button>
                <Button onClick={handleSendToAnalyze} variant="primary">
                    {t("Send to analyze")}
                </Button>
            </Stack>
        </Stack>
    );
};
