import React, { useEffect, useState } from "react";
import { Page } from "../../../components/simple/Page";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { AdminCardInfo } from "../../../components/simple/AdminCardInfo/AdminCardInfo";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { fetchInvestmentData } from "../../../redux/actions/adminActions";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { CreateIdeaDialog } from "../create-idea-section/CreateIdeaDialog";

export const CreateInvestmentIdea: React.FC = () => {
    const [dialog, setDialog] = useState(false);
    const investmentData = useSelector(
        (store: StoreData) => store.admin.investmentIdeas
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInvestmentData());
    }, []);

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
                        onClick={() => setDialog(true)}
                    >
                        Create idea
                    </Button>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={2}>
                        <AdminCardInfo
                            iconName="ant-design:eye-outlined"
                            countStats={investmentData.viewToday}
                            title="Views today"
                            backgroundColor="rgb(153 186 253)"
                            color="rgb(77 71 171)"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <AdminCardInfo
                            iconName="ant-design:comment-outlined"
                            countStats={investmentData.commentsToday}
                            title="Comments today"
                            backgroundColor="rgb(153 186 253)"
                            color="rgb(77 71 171)"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}></Grid>
                    <Grid item xs={12} sm={6} md={3}></Grid>
                </Grid>
            </Container>
            <CreateIdeaDialog open={dialog} setOpen={() => setDialog(false)} />
        </Page>
    );
};
