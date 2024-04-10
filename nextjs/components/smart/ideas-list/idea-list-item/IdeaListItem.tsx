import React from "react";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { InvestmentIdea } from "../../../../ts/types/entity/stock-market.types";
import { List } from "antd";
import { LinkWrapper } from "../../../simple/link/Link";
interface IdeaListItem {
    idea: InvestmentIdea;
}
export const IdeaListItem: React.FC<IdeaListItem> = ({ idea }) => {
    const { t } = useTranslation();
    return (
        <List.Item>
            <List.Item.Meta
                avatar={
                    <LinkWrapper
                        href={"/investment-idea/[id]"}
                        as={`/investment-idea/${idea.id}`}
                    >
                        <Avatar
                            src={`${process.env.API_URL}/storage/${idea.logo}`}
                            sx={{ width: 24, height: 24 }}
                        />
                    </LinkWrapper>
                }
                title={
                    <LinkWrapper
                        href={"/investment-idea/[id]"}
                        as={`/investment-idea/${idea.id}`}
                    >
                        {idea.stock}
                    </LinkWrapper>
                }
                description={t("Potential profit", {
                    amount: idea.possibleProfit.toFixed(0),
                })}
            />
        </List.Item>
    );
};
