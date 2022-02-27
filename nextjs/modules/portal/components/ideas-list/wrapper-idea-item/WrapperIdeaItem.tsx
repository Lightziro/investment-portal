import React from "react";
import { sizeByViewMode } from "../../../utils/view-mode.utils";
import { ViewMode } from "../../../ts/types/other.types";
import { Grid } from "@mui/material";

interface WrapperIdeaItem {
    viewMode: ViewMode;
}

export const WrapperIdeaItem: React.FC<WrapperIdeaItem> = ({
    children,
    viewMode,
}) => {
    return (
        <Grid
            xl={sizeByViewMode(viewMode, 4)}
            lg={sizeByViewMode(viewMode, 4)}
            md={sizeByViewMode(viewMode, 6)}
            sm={sizeByViewMode(viewMode, 6)}
            xs={sizeByViewMode(viewMode, 12)}
            item
        >
            {children}
        </Grid>
    );
};
