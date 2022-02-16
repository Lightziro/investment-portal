import React from "react";
import { Card, Skeleton, Stack, Typography, Divider } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { IdeaModel } from "../../../../ts/types/entity/idea.types";

interface IdeaInformation {
    ideaInfo: IdeaModel;
}

export const IdeaInformation: React.FC<IdeaInformation> = ({ ideaInfo }) => {
    const { t } = useTranslation();
    if (!ideaInfo) {
        return <Skeleton variant="rectangular" height={192} />;
    }
    // TODO: Переместить в utils
    const getTypePosition = (): string => {
        return ideaInfo.is_short ? "Short" : "Long";
    };
    const getTermIdea = (): number => {
        const start = moment(ideaInfo.date_start);
        const end = moment(ideaInfo.date_end);
        return end.diff(start, "month");
    };
    return (
        <Card
            className="shadow-wrapper"
            sx={{ bgcolor: "white", p: 1, color: "black" }}
        >
            <Typography align="center" variant="h6">
                {t("Information about idea")}
            </Typography>
            <Typography align="center" variant="subtitle2" sx={{ my: 1 }}>
                {t("Type position", { type: t(getTypePosition()) })}
            </Typography>
            <Stack>
                <Typography gutterBottom variant="body2">
                    {t("Purchase price", { amount: ideaInfo.price_buy })}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {t("Sale price", { amount: ideaInfo.price_sell })}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {`Date start: ${moment(ideaInfo.date_start).format(
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
