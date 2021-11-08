import React from "react";
import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";

export const NewsPortalList: React.FC = () => {
    const { i18n, t } = useTranslation();
    moment.locale(i18n.language);
    const news = useSelector((state: StoreData) => state.main.news);

    return (
        <Paper elevation={2} sx={{ px: 2, py: 1 }}>
            <Typography variant="h5" gutterBottom>
                {t("News")}
            </Typography>
            <Stack
                spacing={1}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                {news
                    ? news.map((item) => (
                          <a href={item.url} target="_blank">
                              <Typography
                                  className="news-title"
                                  variant="body2"
                              >
                                  {item.headline}
                              </Typography>
                              <Typography variant="overline">
                                  {moment.unix(item.datetime).format("LT")}
                              </Typography>
                          </a>
                      ))
                    : Array(20)
                          .fill(0)
                          .map((item) => (
                              <Skeleton variant={"rectangular"} height={51} />
                          ))}
            </Stack>
        </Paper>
    );
};
