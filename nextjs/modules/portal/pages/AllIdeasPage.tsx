import React, { useState } from "react";
import { IdeaModel } from "../../../ts/types/entity/idea.types";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { axios } from "../../../utils/axios";
import { HeaderAllIdeas } from "../components/header-all-ideas/HeaderAllIdeas";
import { ViewMode } from "../ts/types/other.types";
import classes from "../Portal.module.scss";
import { IdeasList } from "../components/ideas-list/IdeasList";

interface AllIdeasPage {
    ideas: IdeaModel[];
    setIdeas: (prev) => void;
}

export const AllIdeasPage: React.FC<AllIdeasPage> = ({ ideas, setIdeas }) => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>("tile");

    const handleChangeSortBy = async (value) => {
        setIdeas(null);
        const data = await axios
            .get(`${process.env.API_URL}/api/idea/all/${value}`)
            .then((res) => res.data);
        setIdeas(data);
    };

    return (
        <Grid container direction="column" justifyContent="center">
            <HeaderAllIdeas
                handleChange={handleChangeSortBy}
                setMode={setViewMode}
                viewMode={viewMode}
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
