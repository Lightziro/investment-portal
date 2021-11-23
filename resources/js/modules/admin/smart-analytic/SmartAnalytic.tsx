import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticData } from "../../../redux/actions/adminActions";
import { Page } from "../../../components/simple/Page";
import { Container, Grid } from "@mui/material";
import { AdminCardInfo } from "../../../components/simple/AdminCardInfo/AdminCardInfo";
import { StoreData } from "../../../ts/types/redux/store.types";
import { ActionSmartAnalytic } from "./action-smart-analytic/ActionSmartAnalytic";

export const SmartAnalytic: React.FC = () => {
    const dispatch = useDispatch();
    const { classificationNews } = useSelector(
        (state: StoreData) => state.admin.smartAnalytic.score
    );
    useEffect(() => {
        dispatch(fetchAnalyticData());
    }, []);
    return (
        <Page title="Admin | Investment Ideas">
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={2}>
                        <AdminCardInfo
                            iconName="ant-design:eye-outlined"
                            countStats={classificationNews}
                            title="Market news match coefficient "
                            backgroundColor="rgb(153 186 253)"
                            color="rgb(77 71 171)"
                        />
                    </Grid>
                </Grid>
                <ActionSmartAnalytic />
            </Container>
        </Page>
    );
};
