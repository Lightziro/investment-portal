import React from "react";
import { InvestmentIdea } from "../../../../ts/types/redux/store.types";
import { Avatar, Paper } from "@mui/material";
import Link from "next/link";
import classes from "../IdeaList.module.scss";
import { useTranslation } from "react-i18next";
interface IdeaListItem {
    idea: InvestmentIdea;
}
export const IdeaListItem: React.FC<IdeaListItem> = ({ idea }) => {
    const { t } = useTranslation();
    return (
        <Paper elevation={2} sx={{ my: 1 }}>
            <Link href={`/investment-idea/${idea.id}`}>
                <div className={classes.ideaItemWrapper}>
                    {/*<Avatar*/}
                    {/*    src={`/image/picture/company-logo/${idea.logo}`}*/}
                    {/*    sx={{ width: 24, height: 24 }}*/}
                    {/*/>*/}
                    <div className={classes.ideaItemInfo}>
                        <div className={classes.potentialProfit}>
                            {t("Potential profit", {
                                amount: idea.possibleProfit,
                            })}
                        </div>
                        <span className={classes.companyName}>
                            {idea.stock}
                        </span>
                    </div>
                </div>
            </Link>
        </Paper>
    );
};
