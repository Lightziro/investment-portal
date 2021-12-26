import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../ts/types/redux/store.types";
import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    Pagination,
    Paper,
} from "@mui/material";
import {
    deleteArticle,
    editArticle,
    fetchArticlesForAdmin,
} from "../../../../redux/actions/articleArtions";
import { LoadingArticle } from "./loading-article/LoadingArticle";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ArticleListAdmin: React.FC = () => {
    const [page, setPage] = useState(0);
    const { list, lastPage, loading } = useSelector(
        (state: StoreData) => state.admin.articles
    );
    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchArticlesForAdmin(page));
    };

    const dispatch = useDispatch();
    return (
        <Grid
            alignItems="center"
            justifyItems="center"
            direction="column"
            container
        >
            {loading ? (
                <LoadingArticle />
            ) : (
                list.map((article) => (
                    <Paper className="article-admin-item-wrapper">
                        <Grid
                            p={2}
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <Grid item sm={6} className="title">
                                {article.title}
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid
                                direction="row"
                                item
                                sm={2}
                                spacing={1}
                                container
                            >
                                <Grid item>
                                    <Avatar
                                        src={`/image/${article.author.avatar}`}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                </Grid>
                                <Grid item>{article.author.fullName}</Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid sm={1}>
                                {moment(article.dateCreate).format("D MMM")}
                            </Grid>
                            <Grid sm={2}>
                                <IconButton color="primary" component="span">
                                    <EditIcon
                                        onClick={() =>
                                            dispatch(
                                                editArticle(article.articleId)
                                            )
                                        }
                                    />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <DeleteIcon
                                        onClick={() =>
                                            dispatch(
                                                deleteArticle(
                                                    article.articleId,
                                                    page
                                                )
                                            )
                                        }
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            )}
            {list && (
                <Pagination
                    onChange={handleChangePage}
                    count={lastPage}
                    defaultValue={page}
                    color="primary"
                />
            )}
        </Grid>
    );
};
