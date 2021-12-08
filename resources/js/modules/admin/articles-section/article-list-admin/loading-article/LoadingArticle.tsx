import React, { Fragment } from "react";
import { Skeleton } from "@mui/material";

export const LoadingArticle: React.FC = () => {
    return (
        <Fragment>
            {Array(3)
                .fill(1)
                .map((_, i) => (
                    <Skeleton
                        key={i}
                        width="100%"
                        height={60}
                        variant={"rectangular"}
                        sx={{ my: 1 }}
                    />
                ))}
        </Fragment>
    );
};
