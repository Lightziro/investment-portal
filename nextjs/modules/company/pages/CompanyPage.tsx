import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import { ChartStatsEPS } from "../../../components/ordinary/charts/ChartStatsEPS";
import { useDispatch } from "react-redux";
import { fetchCompanyStats } from "../../../redux/actions/investmentIdeaActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { clearView } from "../../../redux/actions/viewActions";

interface CompanyPage {
    company: CompanyModel;
}

export const CompanyPage: React.FC<CompanyPage> = ({ company }) => {
    const dispatch = useDispatch();
    const { epsStats } = useRootSelector((state) => state.view.company);
    useEffect(() => {
        dispatch(clearView("company"));
        dispatch(fetchCompanyStats(company.company_id, "company"));
    }, []);
    return (
        <Grid spacing={2} direction="row" container>
            <Grid item sm={7}>
                <Paper sx={{ px: 1, py: 2 }}>{company.name}</Paper>
            </Grid>
            <Grid item sm={5} spacing={2}>
                <ChartStatsEPS epsData={epsStats} />
            </Grid>
        </Grid>
    );
};
