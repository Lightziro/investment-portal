import React from "react";
import { Row } from "react-bootstrap";
import { InvestmentIdea } from "../../../ts/types/redux/store.types";
import { Avatar, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
interface IdeaItem {
    idea: InvestmentIdea;
}
export const IdeaItem: React.FC<IdeaItem> = ({ idea }) => {
    const { t } = useTranslation();
    return (
        <div className="idea-item-wrapper">
            <Avatar
                src={`/image/picture/company-logo/${idea.logo}`}
                sx={{ width: 56, height: 56 }}
            />
            <div className="idea-item-info">
                <div className="potential-profit">
                    {t("Potential profit", { amount: idea.possibleProfit })}
                </div>
                <span className="company-name">{idea.stock}</span>
                <Button className="btn-watch" variant={"outlined"}>
                    {t("Read")}
                </Button>
            </div>
        </div>
    );
};
