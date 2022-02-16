import React from "react";
import { Card, Stack, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import classes from "../../InvestmentIdea.module.scss";
import { AuthorIdea } from "../../../../ts/types/entity/idea.types";
interface IdeaAuthor {
    data: AuthorIdea;
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
                <Link href={`/profile/[id]`} as={`/profile/${data.user_id}`}>
                    <a>
                        <UserAvatar
                            avatar={data.avatar_path}
                            height={56}
                            width={56}
                        />
                    </a>
                </Link>
                <Typography variant="h6" align="center">
                    {data.full_name}
                </Typography>
            </div>
            <Stack spacing={1}>
                <Typography variant="body2" component="p">
                    {t("Total ideas", { amount: data.total_ideas })}
                </Typography>
                <Typography variant="body2" gutterBottom component="p">
                    {t("Successful ideas", {
                        amount: data.amount_success_ideas,
                    })}
                </Typography>
                <Typography variant="body2" gutterBottom component="p">
                    {t("Fail ideas", { amount: data.amount_fail_ideas })}
                </Typography>
            </Stack>
        </Card>
    );
};
