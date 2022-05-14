import React, {Fragment} from "react";
import { TabPanel } from "../../../../components/simple/tabl-panel/TabPanel";
import {useTranslation} from "react-i18next";
import {IdeasStats} from "../../sections/stats/ideas-stats/IdeasStats";
import {ArticlesStats} from "../../sections/stats/articles-stats/ArticlesStats";
import {AppBar, Tab, Tabs} from "@mui/material";
import {a11yProps} from "../../../../utils/other";

const AdminStats = () => {
    const {t} = useTranslation();
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {["Investment ideas", "Articles"].map((item, key) => (
                        <Tab label={t(item)} {...a11yProps(key)} />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <IdeasStats/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ArticlesStats/>
            </TabPanel>
        </Fragment>
    );
};
export default AdminStats;
