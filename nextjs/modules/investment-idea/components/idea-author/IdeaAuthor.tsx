import React from "react";
import { Avatar, Card, Grid, Stack, Skeleton, Typography } from "@mui/material";
import { AuthorInfo } from "../../../../ts/types/state/user.types";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import classes from "../../InvestmentIdea.module.scss";
interface IdeaAuthor {
    data: AuthorInfo;
}
export const IdeaAuthor: React.FC<IdeaAuthor> = ({ data }) => {
    if (!data) {
        return <Skeleton variant="rectangular" height={208} />;
    }
    const { t } = useTranslation();
    return (
        <Card
            sx={{ bgcolor: "rgba(144, 202, 249, 0.85)", p: 1 }}
            className="shadow-wrapper"
        >
            <div className={classes.authorInfo}>
                <Link href={`/profile/[id]`} as={`/profile/${data.userId}`}>
                    <UserAvatar user={data.avatar} height={56} width={56} />
                </Link>
                <Typography variant="h6" align="center">
                    {data.fullName}
                </Typography>
            </div>
            <Stack spacing={1}>
                <Typography variant="body2" component="p">
                    {t("Total ideas", { amount: data.totalIdeas })}
                </Typography>
                <Typography variant="body2" gutterBottom component="p">
                    {t("Successful ideas", {
                        amount: data.amountSuccessfulIdeas,
                    })}
                </Typography>
                <Typography variant="body2" gutterBottom component="p">
                    {t("Fail ideas", { amount: data.amountFailIdeas })}
                </Typography>
            </Stack>
        </Card>
    );
};
