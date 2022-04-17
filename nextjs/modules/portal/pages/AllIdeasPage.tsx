import React, { useState } from "react";
import { IdeaModel } from "../../../ts/types/entity/idea.types";
import { Grid } from "@mui/material";
import {
    HeaderAllIdeas,
    HeaderEntityPanel,
} from "../components/header-entity-panel/HeaderEntityPanel";
import { ViewMode } from "../ts/types/other.types";
import classes from "../Portal.module.scss";
import { IdeasList } from "../components/ideas-list/IdeasList";
import { sortBy } from "../../../utils/api/get-data";
import { Entity } from "../../../ts/enums/other.enums";
import { SORT_IDEAS } from "../../../config/menu-items";

interface AllIdeasPage {
    ideas: IdeaModel[];
    setIdeas: (prev) => void;
}

export const AllIdeasPage: React.FC<AllIdeasPage> = ({ ideas, setIdeas }) => {
    const [viewMode, setViewMode] = useState<ViewMode>("tile");

    const handleChangeSortBy = async (value) => {
        setIdeas(null);
        const data = await sortBy(Entity.InvestmentIdea, value);
        setIdeas(data);
    };

    return (
        <Grid container direction="column" justifyContent="center">
            <HeaderEntityPanel
                handleChange={handleChangeSortBy}
                setMode={setViewMode}
                viewMode={viewMode}
                defaultSelectValue="idea_id"
                selectItems={SORT_IDEAS}
                entity={Entity.InvestmentIdea}
            />
            <Grid
                container
                className={classes.wrapperItems}
                justifyContent="center"
                spacing={2}
            >
                <IdeasList ideas={ideas} mode={viewMode} />
            </Grid>
        </Grid>
    );
};
