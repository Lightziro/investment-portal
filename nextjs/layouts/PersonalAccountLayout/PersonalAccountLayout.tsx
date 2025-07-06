import React, { useEffect } from "react";
import { Divider, Grid, Paper } from "@mui/material";
import { UserInfo } from "../../modules/personal-account/components/user-info/UserInfo";
import { AccountToolBar } from "../../modules/personal-account/components/account-tool-bar/AccountToolBar";
import { useRouter } from "next/router";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { checkNoUserAuth } from "../../utils/user/user-check-root";
import styles from "./PersonalAccountLayout.module.scss";
interface PersonalAccountLayout {
    children: React.ReactNode;
}
export const PersonalAccountLayout: React.FC<PersonalAccountLayout> = ({
    children,
}) => {
    const { fetch, data } = useRootSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (checkNoUserAuth(fetch, data)) {
            router.push("/");
        }
    }, [data, fetch]);

    if (!data || !fetch) {
        return null;
    }
    return (
        <Grid direction="row" justifyContent="center" container spacing={3}>
            <Grid
                flexDirection="column"
                size={{ lg: 3, sm: 9, xl: 3, xs: 12, md: 3 }}
                container
            >
                <Paper elevation={2} className={styles.paperContainer}>
                    <UserInfo />
                    <AccountToolBar />
                    <Divider />
                    {children}
                </Paper>
            </Grid>
        </Grid>
    );
};
