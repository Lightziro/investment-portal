import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import { AdminEntity } from "../../../../../redux/ts/enums/admin/admin.enum";
import { Pagination, Skeleton, Stack } from "@mui/material";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import { InvestmentIdeaItemAdmin } from "../../../../../redux/ts/types/admin/investment-ideas/admin-ideas.types";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";
import { getIdeaStatsText } from "../../../utils/entity-list";

export const AdminIdeasList: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.investmentIdeas
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(AdminEntity.InvestmentIdea, page));
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
                    ]}
                    row={list.map((idea: InvestmentIdeaItemAdmin) => [
                        idea.ideaId,
                        idea.company,
                        getIdeaStatsText("view", idea),
                        getIdeaStatsText("comments", idea),
                        !idea.score && idea.status === IdeaStatus.Created
                            ? "Wait analytic"
                            : idea.score,
                        idea.status,
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
