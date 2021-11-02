import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestmentIdea } from "../../../redux/actions/mainActions";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Grid, Typography } from "@mui/material";
import { ChartStatsEPS } from "./charts-company-data/ChartStatsEPS";

export const InvestmentIdeaPage: React.FC = () => {
    const dispatch = useDispatch();
    const ideaData = useSelector((state: StoreData) => state.main.ideaView);
    const { ideaId } = useParams();
    useEffect(() => {
        dispatch(fetchInvestmentIdea(parseInt(ideaId)));
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div>Testick</div>
                </Grid>
                <Grid item xs={4}>
                    <ChartStatsEPS epsData={ideaData.epsStats} />
                </Grid>
            </Grid>
        </div>
    );
};
