import React, { Fragment } from "react";
import { Grid, Skeleton } from "@mui/material";
interface LoadArticleItems {
    count: number;
    height: number;
    sm: any;
}
export const LoadArticleItems: React.FC<LoadArticleItems> = ({
    count,
    height,
    sm,
}) => {
    return (
        <Fragment>
            {Array(count)
                .fill(1)
                .map((item) => (
                    <Grid key={item} item sm={sm}>
                        <Skeleton height={height} variant={"rectangular"} />
                    </Grid>
                ))}
        </Fragment>
    );
};
