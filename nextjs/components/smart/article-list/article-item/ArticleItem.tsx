import React from "react";
import { Avatar } from "@mui/material";
import { ArticleModel } from "../../../../ts/types/entity/article.types";
import { LinkWrapper } from "../../../simple/link/Link";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import classes from "../../Smart.module.scss";

const { Meta } = Card;

interface ArticleItem {
    item: ArticleModel;
}

export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    const { t } = useTranslation();
    return (
        <Card
            className={classes.articleCard}
            cover={
                <img
                    alt={`${t("Preview article")}`}
                    src={
                        item.preview_path
                            ? `${process.env.API_URL}/storage/${item.preview_path}`
                            : "/images/picture/other/no-preview.svg"
                    }
                />
            }
        >
            <Meta
                prefixCls="article"
                avatar={
                    <LinkWrapper
                        href={`/profile/[id]`}
                        as={`/profile/${item.author.user_id}`}
                    >
                        <Avatar
                            src={`${process.env.API_URL}/storage/${item.author.avatar_path}`}
                        />
                    </LinkWrapper>
                }
                title={
                    <LinkWrapper
                        className="test"
                        href={`/article/[id]`}
                        as={`/article/${item.article_id}`}
                    >
                        {item.title}
                    </LinkWrapper>
                }
            />
        </Card>
    );
};
