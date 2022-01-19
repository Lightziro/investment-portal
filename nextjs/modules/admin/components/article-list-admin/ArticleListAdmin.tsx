import React, { useState, Fragment } from "react";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { fetchArticlesAdminList } from "../../../../redux/actions/admin/adminArticleActions";
import { EntityTable } from "../../../../components/simple/entity-table/EntityTable";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import { useRouter } from "next/router";

export const ArticleListAdmin: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.articles
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchArticlesAdminList(page));
    };

    return (
        <Fragment>
            {loading ? (
                <Skeleton height={240} sx={{ my: 1 }} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={["ID", "Title", "Author", "Date create", "Edit"]}
                    row={list.map((article) => [
                        article.articleId,
                        article.title,
                        <Stack direction="row" alignItems="center">
                            <UserAvatar avatar={article.author.avatar} />
                            <span className="ms-2">
                                {article.author.fullName}
                            </span>
                        </Stack>,
                        moment(article.dateCreate).format("D MMM"),
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <EditIcon
                                onClick={() =>
                                    router.push(
                                        `/admin/articles/${article.articleId}`
                                    )
                                }
                            />
                        </IconButton>,
                    ])}
                />
            )}
            {lastPage && (
                <Stack alignItems="center">
                    <Pagination
                        onChange={handleChangePage}
                        count={lastPage}
                        defaultValue={page}
                        color="primary"
                    />
                </Stack>
            )}
        </Fragment>
    );
};
