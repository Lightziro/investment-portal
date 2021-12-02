import React from "react";
import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import { Article } from "../../../../ts/types/state/article.types";
import { Link } from "react-router-dom";
import moment from "moment";
interface ArticleItem {
    item: Article;
}
export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    return (
        <Card sx={{ height: 306 }}>
            <Link to={`/article/${item.articleId}`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={`/image/preview/${item.preview}`}
                    alt={`Preview ${item.title}`}
                />
            </Link>
            <CardHeader
                avatar={
                    <Link to={`/profile/${item.author.userId}`}>
                        <Avatar src={`/image/${item.author.avatar}`} />
                    </Link>
                }
                title={
                    <Link to={`/article/${item.articleId}`}>{item.title}</Link>
                }
                subheader={moment(item.dateCreate).fromNow()}
            />
        </Card>
    );
};
