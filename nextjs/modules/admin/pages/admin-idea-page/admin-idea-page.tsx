import React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../../../components/simple/tabl-panel/TabPanel";
import { IdeaStatus } from "../../../../ts/enums/investment-idea.enum";
import { PublishFormIdea } from "../../sections/investment-ideas/publish-form-idea/PublishFormIdea";
import { DtoPersonalIdea } from "../../ts/types/response/admin-response-personal";

interface AdminIdeaPage {
    idea: DtoPersonalIdea;
}

export const AdminIdeaPage: React.FC<AdminIdeaPage> = ({ idea }) => {
    const [tab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const a11yProps = (index) => ({
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    });

    if (!idea) {
        return;
    }
    return (
        <Box sx={{ bgcolor: "background.paper" }}>
            <AppBar position="static">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Stats idea" {...a11yProps(0)} />
                    {idea.status === IdeaStatus.Analyzed && (
                        <Tab label="Publish" {...a11yProps(1)} />
                    )}
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <PublishFormIdea idea={idea} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
};
