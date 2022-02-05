import React from "react";
import { Avatar } from "@mui/material";
import { Article } from "../../../../ts/types/entity/article.types";
import moment from "moment";
import { LinkWrapper } from "../../../simple/link/Link";
import { Card } from "antd";
import {useTranslation} from "react-i18next";
const { Meta } = Card;
interface ArticleItem {
    item: Article;
}
export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    const {t} = useTranslation()
    return (
        <Card
            style={{ width: "100%" }}
            cover={
                <img alt={`${t('Preview article')}`} src={`${process.env.API_URL}/storage/${item.preview}`} />
            }
        >
            <Meta
                avatar={
                    <LinkWrapper
                        href={`/profile/[id]`}
                        as={`/profile/${item.author.userId}`}
                    >
                        <Avatar
                            src={`${process.env.API_URL}/storage/${item.author.avatar}`}
                        />
                    </LinkWrapper>
                }
                title={
                    <LinkWrapper
                        href={`/article/[id]`}
                        as={`/article/${item.articleId}`}
                    >
                        {item.title}
                    </LinkWrapper>
                }
                description={moment(item.dateCreate).fromNow()}
            />
        </Card>
    );
};
