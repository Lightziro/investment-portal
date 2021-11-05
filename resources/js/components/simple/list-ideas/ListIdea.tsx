import React from "react";
import { Avatar, Grid, Skeleton, Stack } from "@mui/material";
import { InvestmentIdea } from "../../../ts/types/redux/store.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface ListIdea {
    ideas: InvestmentIdea[];
}

export const ListIdea: React.FC<ListIdea> = ({ ideas }) => {
    const { t } = useTranslation();
    return (
        <Grid
            className="list-idea-wrapper shadow-wrapper"
            justifyContent="flex-start"
            direction="column"
        >
            {ideas
                ? ideas.map((idea) => (
                      <Link to={`/investment-idea/${idea.id}`}>
                          <div key={idea.id} className="item-idea-wrapper">
                              <Stack alignItems="center" direction="row">
                                  <Avatar
                                      src={`/image/picture/company-logo/apple.png`}
                                  />
                                  <span>{idea.stock}</span>
                              </Stack>
                              <div className="potential-profit">
                                  {t(`Potential profit`, {
                                      amount: idea.possibleProfit,
                                  })}
                              </div>
                          </div>
                      </Link>
                  ))
                : Array(5)
                      .fill(1)
                      .map((item) => (
                          <div className="load-idea-item">
                              <Skeleton
                                  variant="rectangular"
                                  width="100%"
                                  height={50}
                              />
                          </div>
                      ))}
        </Grid>
    );
};
