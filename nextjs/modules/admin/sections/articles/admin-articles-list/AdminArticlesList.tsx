import React, { Fragment, useState } from "react";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import { AdminEntity } from "../../../../../redux/ts/enums/admin/admin.enum";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import { UserAvatar } from "../../../../../components/simple/user-avatar/UserAvatar";
import { DtoArticleItem } from "../../../ts/types/response/admin-response-item.types";

export const AdminArticlesList: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.articles
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(AdminEntity.Article, page));
    };

    return (
        <Fragment>
            {loading ? (
                <Skeleton height={240} sx={{ my: 1 }} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={["ID", "Title", "Author", "Date create", "Edit"]}
                    row={list.map((article: DtoArticleItem) => [
                        article.article_id,
                        article.title,
                        <Stack direction="row" alignItems="center">
                            <UserAvatar avatar={article.author.avatar_path} />
                            <span className="ms-2">
                                {article.author.full_name}
                            </span>
                        </Stack>,
                        moment(article.created_at).format("D MMM"),
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <EditIcon
                                onClick={() =>
                                    router.push(
                                        `/admin/articles/${article.article_id}`
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
