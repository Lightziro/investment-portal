import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import { useTranslation } from "react-i18next";
import { IdeasStats } from "../../sections/stats/ideas-stats/IdeasStats";

const AdminStats = () => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState<string>("0");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(String(newValue));
    };

    return (
        <TabContext value={value}>
            <TabList
                centered
                onChange={handleChange}
                aria-label="lab API tabs example"
            >
                {["Investment ideas", "Articles", "Users"].map((item, key) => (
                    <Tab label={t(item)} value={key} />
                ))}
            </TabList>
            <TabPanel value={"0"}>
                <IdeasStats />
            </TabPanel>
            <TabPanel value={"1"}>Item Two</TabPanel>
            <TabPanel value={"2"}>Item Three</TabPanel>
        </TabContext>
    );
};
export default AdminStats;
