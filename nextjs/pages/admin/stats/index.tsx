import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AppBar, Container } from "@mui/material";

export const Index: NextPage = () => {
    const { t } = useTranslation();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <MainLayout title={t("Admin panel")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <TabContext value={value}>
                        <AppBar color="primary">
                            <TabList
                                centered
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                {["Investment ideas", "Articles", "Users"].map(
                                    (item, key) => (
                                        <Tab label={t(item)} value={key} />
                                    )
                                )}
                            </TabList>
                        </AppBar>
                        <TabPanel value={0}>Item One</TabPanel>
                        <TabPanel value={1}>Item Two</TabPanel>
                        <TabPanel value={2}>Item Three</TabPanel>
                    </TabContext>
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Index;
