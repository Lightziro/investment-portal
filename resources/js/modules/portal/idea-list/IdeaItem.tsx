import React from "react";
import { Row } from "react-bootstrap";
import { InvestmentIdea } from "../../../ts/types/redux/store.types";
import { Avatar, Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface IdeaItem {
    idea: InvestmentIdea;
}
export const IdeaItem: React.FC<IdeaItem> = ({ idea }) => {
    const { t } = useTranslation();
    return (
        <Paper elevation={2} sx={{ my: 1 }}>
            <Link to={`/investment-idea/${idea.id}`}>
                <div className="idea-item-wrapper">
                    <Avatar
                        src={`/image/picture/company-logo/${idea.logo}`}
                        sx={{ width: 24, height: 24 }}
                    />
                    <div className="idea-item-info">
                        <div className="potential-profit">
                            {t("Potential profit", {
                                amount: idea.possibleProfit,
                            })}
                        </div>
                        <span className="company-name">{idea.stock}</span>
                    </div>
                </div>
            </Link>
        </Paper>
    );
};
