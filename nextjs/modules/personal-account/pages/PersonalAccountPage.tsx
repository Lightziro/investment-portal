import React from "react";
import { Grid, Paper } from "@mui/material";
import { UserInfo } from "../components/user-info/UserInfo";
import { AccountToolBar } from "../components/account-tool-bar/AccountToolBar";

export const PersonalAccountPage = ({}) => {
    return (
        <Grid direction="row" container spacing={3}>
            <Grid container direction="column" xl={3} item>
                <Paper elevation={3} sx={{ py: 2, px: 3 }}>
                    <UserInfo />
                    <AccountToolBar />
                </Paper>
            </Grid>
            <Grid xl={9} item>
                Test
            </Grid>
        </Grid>
    );
};
