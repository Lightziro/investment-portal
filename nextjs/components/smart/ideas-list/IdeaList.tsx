import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { IdeaListItem } from "./idea-list-item/IdeaListItem";
import { LoadIdeasList } from "./load-ideas-list/LoadIdeasList";
import { Card } from "../../simple/card/Card";
import Skeleton from "react-loading-skeleton";
import { Typography } from "../../simple/typography/Typography";
import { Divider } from "antd";

export const IdeaList: React.FC = () => {
    const ideaList = useSelector(
        (state: StoreData) => state.main.investmentData.investmentIdeas
    );
    const { t } = useTranslation();
    return (
        <div className="portal-component-wrapper">
            <Card backgroundColor="#b0deff">
                <Typography level={4}>{t("The best ideas")}</Typography>
                <Divider />
                {/*<Divider light />*/}
                {/*<Box padding={1}>*/}
                {/*    {ideaList ? (*/}
                {/*        ideaList.map((idea) => (*/}
                {/*            <IdeaListItem key={idea.id} idea={idea} />*/}
                {/*        ))*/}
                {/*    ) : (*/}
                {/*        <LoadIdeasList />*/}
                {/*    )}*/}
                {/*</Box>*/}
            </Card>
        </div>
    );
};
