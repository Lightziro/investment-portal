import React from "react";
import { Grid, Paper } from "@mui/material";
import { UserInfo } from "../modules/personal-account/components/user-info/UserInfo";
import { AccountToolBar } from "../modules/personal-account/components/account-tool-bar/AccountToolBar";

export const PersonalAccountLayout: React.FC = ({ children }) => {
    return (
        <Grid direction="row" justifyContent="center" container spacing={3}>
            <Grid
                lg={3}
                container
                direction="column"
                sm={9}
                xl={3}
                xs={12}
                md={3}
                item
            >
                <Paper elevation={3} sx={{ py: 2, px: 3 }}>
                    <UserInfo />
                    <AccountToolBar />
                </Paper>
            </Grid>
            <Grid lg={9} sm={9} xl={9} md={9} xs={12} item>
                {children}
            </Grid>
        </Grid>
    );
};
