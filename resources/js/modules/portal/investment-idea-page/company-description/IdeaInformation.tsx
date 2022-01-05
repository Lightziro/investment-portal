import React from "react";
import { Card, Skeleton, Stack, Typography, Divider } from "@mui/material";
import { IdeaInfo } from "../../../../../../nextjs/ts/types/state/stock-market.types";
interface IdeaInformation {
    ideaInfo: IdeaInfo;
}
import moment from "moment";
import { useTranslation } from "react-i18next";
export const IdeaInformation: React.FC<IdeaInformation> = ({ ideaInfo }) => {
    const { t } = useTranslation();
    if (!ideaInfo) {
        return <Skeleton variant="rectangular" height={192} />;
    }
    const getTypePosition = (): string => {
        return ideaInfo.isShort ? "Short" : "Long";
    };
    const getTermIdea = (): number => {
        const start = moment(ideaInfo.dateStart);
        const end = moment(ideaInfo.dateEnd);
        return end.diff(start, "month");
    };
    return (
        <Card
            className="shadow-wrapper"
            sx={{ bgcolor: "#29a0fb", p: 1, color: "white" }}
        >
            <Typography align="center" variant="h6">
                {t("Information about idea")}
            </Typography>
            <Typography align="center" variant="subtitle2" sx={{ my: 1 }}>
                {t("Type position", { type: t(getTypePosition()) })}
            </Typography>
            <Stack>
                <Typography gutterBottom variant="body2">
                    {t("Purchase price", { amount: ideaInfo.priceBuy })}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {t("Sale price", { amount: ideaInfo.priceSell })}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {`Date start: ${moment(ideaInfo.dateStart).format(
                        "Do MMMM YYYY"
                    )}`}
                </Typography>
            </Stack>
            <Divider />
            <Typography align="center" variant="h6">
                {t("Investment term", { term: getTermIdea() })}
            </Typography>
        </Card>
    );
};
