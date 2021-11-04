import React from "react";
import { Card, Skeleton, Stack, Typography, Divider } from "@mui/material";
import { IdeaInfo } from "../../../../ts/types/state/stock-market.types";
interface IdeaInformation {
    ideaInfo: IdeaInfo;
}
import moment from "moment";
export const IdeaInformation: React.FC<IdeaInformation> = ({ ideaInfo }) => {
    console.log(ideaInfo);
    if (!ideaInfo) {
        return <Skeleton variant="rectangular" height="180" />;
    }
    const getTypeTextPosition = (isShort: boolean): string => {
        return isShort ? "Short" : "Long";
    };
    const getTermIdea = (): number => {
        const start = moment(ideaInfo.dateStart);
        const end = moment(ideaInfo.dateEnd);
        return end.diff(start, "month");
    };
    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "#9d8ffd", p: 1 }}>
            <Typography align="center" variant="h6" color="white">
                Information about the idea
            </Typography>
            <Typography align="center" variant="subtitle2" sx={{ my: 1 }}>
                Type position: {getTypeTextPosition(ideaInfo.isShort)}
            </Typography>
            <Stack>
                <Typography variant="body2">
                    Purchase price: {ideaInfo.priceBuy}$
                </Typography>
                <Typography variant="body2">
                    Sale price: {ideaInfo.priceSell}$
                </Typography>
                <Typography variant="body2">
                    {`Date start: ${moment(ideaInfo.dateStart).format(
                        "Do MMMM YYYY"
                    )}`}
                </Typography>
            </Stack>
            <Divider />
            <Typography align="center" variant="h6">
                {`Investment term ${getTermIdea()} months`}
            </Typography>
        </Card>
    );
};
