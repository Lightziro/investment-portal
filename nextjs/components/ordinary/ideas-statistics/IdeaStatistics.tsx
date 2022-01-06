import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { PaperWrapper } from "../../simple/paper-wrapper/PaperWrapper";
import { Divider, Typography } from "antd";
import Skeleton from "react-loading-skeleton";
import { Stack } from "react-bootstrap";

export const IdeaStatistics: React.FC = () => {
    const stats = useSelector(
        (state: StoreData) => state.main.investmentData.ideaStatistics
    );
    const { t } = useTranslation();
    return (
        <div className="portal-component-wrapper">
            {stats ? (
                <PaperWrapper>
                    <Typography.Title level={5}>
                        {t("We offer best ideas")}
                    </Typography.Title>
                    <Divider />
                    <Stack direction="horizontal" gap={1}>
                        <div className="wrapper-stats-idea">
                            <span className="label-stats-ideas">
                                {t("Successful ideas")}
                            </span>
                            <div className="value-stats-ideas">
                                {stats.success}
                            </div>
                        </div>
                        <div className="wrapper-stats-idea">
                            <span className="label-stats-ideas">
                                {t("Failed ideas")}
                            </span>
                            <span className="value-stats-ideas">
                                {stats.fail}
                            </span>
                        </div>
                    </Stack>
                </PaperWrapper>
            ) : (
                <Skeleton height={163} />
            )}
        </div>
    );
};
