import React, { useEffect, useState } from "react";
import { Page } from "../../../components/simple/Page";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { AdminCardInfo } from "../../../components/simple/AdminCardInfo/AdminCardInfo";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { fetchInvestmentData } from "../../../redux/actions/adminActions";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";

export const CreateInvestmentIdea: React.FC = () => {
    const [dialog, setDialog] = useState(false);
    const investmentData = useSelector(
        (store: StoreData) => store.admin.investmentIdeas
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInvestmentData());
    }, []);
    const handleDialog = () => {
        setDialog(!dialog);
    };
    return (
        <Page title="Admin | Investment Ideas">
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Stats your investment ideas
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Icon icon="ant-design:plus-outlined" />}
                        onClick={handleDialog}
                    >
                        Create idea
                    </Button>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AdminCardInfo
                            iconName="ant-design:eye-filled"
                            countStats={investmentData.viewToday}
                            title="Views today"
                            backgroundColor="rgb(208, 242, 255)"
                            color="rgb(0, 82, 73)"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AdminCardInfo
                            iconName="ant-design:like-filled"
                            countStats={investmentData.likedToday}
                            title="Liked today"
                            backgroundColor="rgb(208, 242, 255)"
                            color="rgb(0, 82, 73)"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}></Grid>
                    <Grid item xs={12} sm={6} md={3}></Grid>
                </Grid>
            </Container>
        </Page>
    );
};
