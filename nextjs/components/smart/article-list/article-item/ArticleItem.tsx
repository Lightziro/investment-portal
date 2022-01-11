import React from "react";
import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import { Article } from "../../../../ts/types/state/article.types";
import Link from "next/link";
import Shiitake from "shiitake";
import moment from "moment";
interface ArticleItem {
    item: Article;
}
export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    return (
        <Card sx={{ height: 274 }}>
            <Link href={`/article/[id]`} as={`/article/${item.articleId}`}>
                <img
                    className="w-100"
                    src={`${process.env.API_URL}/storage/${item.preview}`}
                    alt={`Preview ${item.title}`}
                />
            </Link>
            <CardHeader
                avatar={
                    <Link
                        href={`/profile/[id]`}
                        as={`/profile/${item.author.userId}`}
                    >
                        <Avatar
                            src={`${process.env.API_URL}/storage/${item.author.avatar}`}
                        />
                    </Link>
                }
                title={
                    <Link
                        href={`/article/[id]`}
                        as={`/article/${item.articleId}`}
                    >
                        <span className="title">{item.title}</span>
                    </Link>
                }
                subheader={moment(item.dateCreate).fromNow()}
            />
        </Card>
    );
};
