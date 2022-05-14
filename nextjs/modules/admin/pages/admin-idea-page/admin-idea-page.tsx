import React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../../../components/simple/tabl-panel/TabPanel";
import { IdeaStatus } from "../../../../ts/enums/investment-idea.enum";
import { PublishFormIdea } from "../../sections/investment-ideas/publish-form-idea/PublishFormIdea";
import { DtoPersonalIdea } from "../../ts/types/response/admin-response-personal";
import StatsIdea from "../../sections/investment-ideas/stats-idea/StatsIdea";
import { useTranslation } from "react-i18next";
import {a11yProps} from "../../../../utils/other";

interface AdminIdeaPage {
    idea: DtoPersonalIdea;
}

export const AdminIdeaPage: React.FC<AdminIdeaPage> = ({ idea }) => {
    const { t } = useTranslation();
    const [tab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };


    if (!idea) {
        return null;
    }
    return (
        <Box >
            <AppBar position="static">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={t("Stats")} {...a11yProps(0)} />
                    <Tab
                        disabled={
                            ![IdeaStatus.Created, IdeaStatus.Analyzed].includes(
                                idea.status
                            )
                        }
                        label={t("Publish")}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                <StatsIdea />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <PublishFormIdea idea={idea} />
            </TabPanel>
        </Box>
    );
};
