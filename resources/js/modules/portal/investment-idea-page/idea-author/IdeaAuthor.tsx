import React from "react";
import { Avatar, Card, Grid, Stack, Skeleton } from "@mui/material";
import { AuthorInfo } from "../../../../ts/types/state/user.types";
interface IdeaAuthor {
    data: AuthorInfo;
}
export const IdeaAuthor: React.FC<IdeaAuthor> = ({ data }) => {
    if (!data) {
        return <Skeleton variant="rectangular" height={208} />;
    }
    return (
        <Card
            sx={{ bgcolor: "rgba(144, 202, 249, 0.85)", p: 1 }}
            className="shadow-wrapper"
        >
            <div className="author-info">
                <Avatar
                    src="/image/picture/avatar_default.jpg"
                    sx={{ width: 56, height: 56 }}
                />
                <span className="author-name">{data.fullName}</span>
            </div>
            <Stack spacing={1}>
                <div className="stats-author-text">
                    Total ideas: {data.totalIdeas}
                </div>
                <div className="stats-author-text">
                    Successful ideas: {data.amountSuccessfulIdeas}
                </div>
                <div className="stats-author-text">
                    Fail ideas: {data.amountFailIdeas}
                </div>
            </Stack>
        </Card>
    );
};
