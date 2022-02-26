import React, { useState } from "react";
import { IdeaModel } from "../../../ts/types/entity/idea.types";
import { Avatar, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LinkWrapper } from "../../../components/simple/link/Link";
import { Card } from "antd";
import { Select } from "antd";
import { axios } from "../../../utils/axios";
import { HeaderAllIdeas } from "../components/header-all-ideas/HeaderAllIdeas";
import { ViewMode } from "../ts/types/other.types";
import { isTile, sizeByViewMode } from "../utils/view-mode.utils";

const { Meta } = Card;

interface AllIdeasPage {
    ideas: IdeaModel[];
    setIdeas: (prev) => void;
}

export const AllIdeasPage: React.FC<AllIdeasPage> = ({ ideas, setIdeas }) => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>("tile");

    const handleChangeSortBy = async (value) => {
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
            <Grid container justifyContent="center" spacing={2}>
                {ideas.map((idea) => (
                    <Grid
                        xl={sizeByViewMode(viewMode, 4)}
                        lg={sizeByViewMode(viewMode, 4)}
                        md={sizeByViewMode(viewMode, 6)}
                        sm={sizeByViewMode(viewMode, 6)}
                        xs={sizeByViewMode(viewMode, 12)}
                        item
                    >
                        <LinkWrapper href={`/investment-idea/${idea.idea_id}`}>
                            <Card key={idea.idea_id} style={{ marginTop: 16 }}>
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={`${process.env.API_URL}/storage/${idea.author.avatar_path}`}
                                        />
                                    }
                                    title={`${t("Invest idea")} ${
                                        idea.company.name
                                    }`}
                                    description="This is the description"
                                />
                            </Card>
                        </LinkWrapper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
