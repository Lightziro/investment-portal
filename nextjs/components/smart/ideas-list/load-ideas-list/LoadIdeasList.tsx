import React, { Fragment } from "react";
import { Skeleton } from "@mui/material";

interface LoadIdeasList {
    count?: number;
}
export const LoadIdeasList: React.FC<LoadIdeasList> = ({ count = 5 }) => {
    return (
        <Fragment>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Skeleton
                        key={i}
                        sx={{ my: 1 }}
                        variant="rectangular"
                        height={55}
                    />
                ))}
        </Fragment>
    );
};
