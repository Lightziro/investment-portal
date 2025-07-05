import React from "react";
import { useTranslation } from "react-i18next";
import { IdeaListItem } from "./idea-list-item/IdeaListItem";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { InvestmentIdea } from "../../../ts/types/entity/stock-market.types";
import { List, Button } from "antd";
import Link from "next/link";

interface IdeaList {
    items: InvestmentIdea[];
}

export const IdeaList: React.FC<IdeaList> = ({ items }) => {
    const { t } = useTranslation();

    return (
        <Grid size={{ md: 6 }} className="portal-component-wrapper">
            <Card sx={{ bgcolor: "white", px: 2, py: 1 }}>
                <Typography
                    align="center"
                    color="black"
                    variant="h5"
                    sx={{ p: 1 }}
                >
                    {t("The best ideas")}
                </Typography>
                <Divider light />
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={(item: InvestmentIdea) => (
                        <IdeaListItem key={item.id} idea={item} />
                    )}
                />
                <Stack direction="column" alignItems="center">
                    <Link href="/investment-idea/all">
                        <Button type="primary" block>
                            {t("View all")}
                        </Button>
                    </Link>
                </Stack>
            </Card>
        </Grid>
    );
};
