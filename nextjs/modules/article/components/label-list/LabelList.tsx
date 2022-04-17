import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { ArticleLabel } from "../../../../ts/types/entity/article.types";
interface LabelList {
    labels: ArticleLabel[];
}
export const LabelList: React.FC<LabelList> = ({ labels }) => {
    return (
        <Grid item container sm={"auto"} spacing={2} direction="row">
            {labels ? (
                labels.map((label, i) => (
                    <Grid key={i} item sm={"auto"}>
                        <Stack
                            className="wrapper-label-item"
                            alignItems="center"
                            direction="row"
                        >
                            <Icon
                                width={26}
                                height={26}
                                color="#b790f5"
                                icon={label.icon}
                            />
                            <span className="article-label-text">
                                {label.text}
                            </span>
                        </Stack>
                    </Grid>
                ))
            ) : (
                <Skeleton
                    variant={"rectangular"}
                    height={62}
                    width="100%"
                    sx={{ ml: 2 }}
                />
            )}
        </Grid>
    );
};
