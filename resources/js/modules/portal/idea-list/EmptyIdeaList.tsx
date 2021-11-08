import React, { Fragment } from "react";
import { Skeleton } from "@mui/material";

interface EmptyIdeaList {
    count?: number;
}
export const EmptyIdeaList: React.FC<EmptyIdeaList> = ({ count = 5 }) => {
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
