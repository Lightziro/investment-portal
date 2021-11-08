import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Card, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IdeaItem } from "./IdeaItem";

export const IdeaList: React.FC = () => {
    const ideaList = useSelector(
        (state: StoreData) => state.main.investmentData.investmentIdeas
    );
    const { t } = useTranslation();
    return (
        <div className="portal-component-wrapper">
            <Card sx={{ bgcolor: "#aac4ff" }}>
                <Typography
                    align="center"
                    color="white"
                    variant="h5"
                    sx={{ p: 1 }}
                >
                    {t("The best ideas")}
                </Typography>
                <Divider light />
                {ideaList
                    ? ideaList.map((idea) => <IdeaItem idea={idea} />)
                    : Array(5)
                          .fill(0)
                          .map((item) => <div>Test</div>)}
            </Card>
        </div>
    );
};
