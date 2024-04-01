import React from "react";
import { Avatar } from "@mui/material";
import { ArticleModel } from "../../../../ts/types/entity/article.types";
import { LinkWrapper } from "../../../simple/link/Link";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import classes from "../../Smart.module.scss";
import styles from './ArticleItem.module.scss';

const { Meta } = Card;

interface ArticleItem {
    item: ArticleModel;
}

export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    const { t } = useTranslation();
    return (<div className={styles.cardWrapper}>
        <img
            alt={`${t("Preview article")}`}
            src={
                item.preview_path
                    ? `${process.env.API_URL}/storage/${item.preview_path}`
                    : "/images/picture/other/no-preview.svg"
            }
        />
        <div className={styles.articleInfo}>
            <LinkWrapper
                href={`/profile/[id]`}
                as={`/profile/${item.author.user_id}`}
            >
                <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={`${process.env.API_URL}/storage/${item.author.avatar_path}`}
                />
            </LinkWrapper>
            <LinkWrapper
                className={styles.articleName}
                href={`/article/[id]`}
                as={`/article/${item.article_id}`}
            >
                {item.title}
            </LinkWrapper>
        </div>
    </div>)
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
