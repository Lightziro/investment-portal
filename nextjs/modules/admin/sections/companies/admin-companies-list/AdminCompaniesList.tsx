import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import { AdminEntity } from "../../../../../redux/ts/enums/admin/admin.enum";
import { Pagination, Skeleton, Stack } from "@mui/material";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import { DtoCompanyItem } from "../../../ts/types/response/admin-response-item.types";
import moment from "moment";

export const AdminCompaniesList: React.FC = () => {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.companies
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(AdminEntity.Company, page));
    };

    return (
        <Fragment>
            {loading ? (
                <Skeleton height={240} sx={{ my: 1 }} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={["ID", "Name", "Date IPO", "Activity"]}
                    row={list.map((company: DtoCompanyItem) => [
                        company.company_id,
                        company.name,
                        // <Stack direction="row" alignItems="center">
                        //     <UserAvatar avatar={article.author.avatar_path} />
                        //     <span className="ms-2">
                        //         {article.author.full_name}
                        //     </span>
                        // </Stack>,
                        moment(company.date_ipo).format("ll"),
                        company.activity,
                        // <IconButton
                        //     color="primary"
                        //     aria-label="upload picture"
                        //     component="span"
                        // >
                        //     <EditIcon
                        //         onClick={() =>
                        //             router.push(
                        //                 `/admin/articles/${article.article_id}`
                        //             )
                        //         }
                        //     />
                        // </IconButton>,
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
