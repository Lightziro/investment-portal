import React, { Fragment } from "react";
import { IdeaModel } from "../../../../ts/types/entity/idea.types";
import { ViewMode } from "../../ts/types/other.types";
import { Avatar } from "@mui/material";
import { WrapperIdeaItem } from "./wrapper-idea-item/WrapperIdeaItem";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";
const { Meta } = Card;

interface IdeasList {
    ideas: IdeaModel[];
    mode: ViewMode;
}

export const IdeasList: React.FC<IdeasList> = ({ ideas, mode }) => {
    const { t } = useTranslation();

    const descriptionIdea = (idea: IdeaModel) => {
        return `${t("Author")}: ${idea.author.full_name}`;
    };

    return (
        <Fragment>
            {ideas
                ? ideas.map((idea) => (
                      <WrapperIdeaItem viewMode={mode}>
                          <LinkWrapper
                              href={`/investment-idea/${idea.idea_id}`}
                          >
                              <Card
                                  key={idea.idea_id}
                                  style={{ marginTop: 16 }}
                              >
                                  <Meta
                                      avatar={
                                          <Avatar
                                              src={`${process.env.API_URL}/storage/${idea.author.avatar_path}`}
                                          />
                                      }
                                      title={`${t("Invest idea")} ${
                                          idea.company.name
                                      }`}
                                      description={descriptionIdea(idea)}
                                  />
                              </Card>
                          </LinkWrapper>
                      </WrapperIdeaItem>
                  ))
                : Array(30)
                      .fill(0)
                      .map((item) => (
                          <WrapperIdeaItem viewMode={mode}>
                              <Skeleton height={120} />
                          </WrapperIdeaItem>
                      ))}
        </Fragment>
    );
};
