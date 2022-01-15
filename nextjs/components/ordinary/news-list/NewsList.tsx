import React from "react";
import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import classes from "./NewsList.module.scss";
import { News } from "../../../ts/types/entity/stock-market.types";
interface NewsList {
    items: News[];
}
export const NewsList: React.FC<NewsList> = ({ items }) => {
    const { i18n, t } = useTranslation();
    moment.locale(i18n.language);
    return (
        <Paper elevation={2} sx={{ px: 2, py: 1 }}>
            <Typography variant="h5" gutterBottom>
                {t("News")}
            </Typography>
            <Stack
                spacing={1}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                {items
                    ? items.map((item) => (
                          <a key={item.id} href={item.url} target="_blank">
                              <Typography
                                  className={classes.newsTitle}
                                  variant="body2"
                              >
                                  {item.headline}
                              </Typography>
                              <Typography variant="overline">
                                  {moment.unix(item.datetime).format("LT")}
                              </Typography>
                          </a>
                      ))
                    : Array(10)
                          .fill(0)
                          .map((_, i) => (
                              <Skeleton
                                  key={i}
                                  variant={"rectangular"}
                                  height={51}
                              />
                          ))}
            </Stack>
        </Paper>
    );
};
