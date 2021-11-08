import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Box, Card, Divider, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IdeaItem } from "./IdeaItem";
import { EmptyIdeaList } from "./EmptyIdeaList";

export const IdeaList: React.FC = () => {
    const ideaList = useSelector(
        (state: StoreData) => state.main.investmentData.investmentIdeas
    );
    const { t } = useTranslation();
    return (
        <div className="portal-component-wrapper">
            <Card sx={{ bgcolor: "#b0deff" }}>
                <Typography
                    align="center"
                    color="white"
                    variant="h5"
                    sx={{ p: 1 }}
                >
                    {t("The best ideas")}
                </Typography>
                <Divider light />
                <Box padding={1}>
                    {ideaList ? (
                        ideaList.map((idea) => (
                            <IdeaItem key={idea.id} idea={idea} />
                        ))
                    ) : (
                        <EmptyIdeaList />
                    )}
                </Box>
            </Card>
        </div>
    );
};
