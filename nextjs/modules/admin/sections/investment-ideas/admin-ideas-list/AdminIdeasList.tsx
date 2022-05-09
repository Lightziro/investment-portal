import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";
import { getIdeaStatsText } from "../../../utils/entity-list";
import { useRouter } from "next/router";
import { DtoIdeaItem } from "../../../ts/types/response/admin-response-item.types";
import { Entity } from "../../../../../ts/enums/other.enums";
import EditIcon from "@mui/icons-material/Edit";

export const AdminIdeasList: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.investmentIdeas
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(Entity.InvestmentIdea, page));
    };

    const [page, setPage] = useState(0);

    return (
        <Fragment>
            {loading ? (
                <Skeleton height={240} sx={{ my: 1 }} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={[
                        "ID",
                        "Company",
                        "View",
                        "Comments",
                        "Score",
                        "Status",
                        "Action",
                    ]}
                    row={list.map((idea: DtoIdeaItem) => [
                        idea.idea_id,
                        idea.company.name,
                        getIdeaStatsText("views", idea),
                        getIdeaStatsText("comments", idea),
                        !idea.score && idea.status === IdeaStatus.Created
                            ? "Wait analytic"
                            : idea.score,
                        idea.status,
                        <IconButton color="primary" component="span">
                            <EditIcon
                                onClick={() =>
                                    router.push(
                                        `/admin/investment-ideas/${idea.idea_id}`
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
