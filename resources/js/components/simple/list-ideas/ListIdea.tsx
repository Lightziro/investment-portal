import React from "react";
import { Avatar, Grid, Skeleton, Stack } from "@mui/material";
import { InvestmentIdea } from "../../../ts/types/redux/store.types";
interface ListIdea {
    ideas: InvestmentIdea[];
}

export const ListIdea: React.FC<ListIdea> = ({ ideas }) => {
    return (
        <Grid
            className="list-idea-wrapper"
            justifyContent="flex-start"
            direction="column"
        >
            {ideas
                ? ideas.map((idea) => (
                      <div key={idea.id} className="item-idea-wrapper">
                          <Stack alignItems="center" direction="row">
                              <Avatar
                                  src={`/image/picture/company-logo/apple.png`}
                              />
                              <span>{idea.stock}</span>
                          </Stack>
                          <div className="potential-profit">
                              {`Потенциальная доходность: ${idea.possibleProfit}%`}
                          </div>
                      </div>
                  ))
                : Array(5)
                      .fill(1)
                      .map((item) => (
                          <div key={item} className="load-idea-item">
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
