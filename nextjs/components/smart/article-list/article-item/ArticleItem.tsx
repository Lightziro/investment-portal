import React from "react";
import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import { Article } from "../../../../ts/types/entity/article.types";
import moment from "moment";
import Shiitake from "shiitake";
import { LinkWrapper } from "../../../simple/link/Link";
interface ArticleItem {
    item: Article;
}
export const ArticleItem: React.FC<ArticleItem> = ({ item }) => {
    return (
        <Card sx={{ height: 274 }}>
            <LinkWrapper
                href={`/article/[id]`}
                as={`/article/${item.articleId}`}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image={`${process.env.API_URL}/storage/${item.preview}`}
                    alt={`Preview ${item.title}`}
                />
            </LinkWrapper>
            <CardHeader
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
                        <Shiitake
                            lines={2}
                            throttleRate={200}
                            className="title"
                            tagName="div"
                        >
                            {item.title}
                        </Shiitake>
                    </LinkWrapper>
                }
                subheader={moment(item.dateCreate).fromNow()}
            />
        </Card>
    );
};
