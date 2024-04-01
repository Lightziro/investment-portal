import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import {IconButton, Pagination, Skeleton, Stack} from "@mui/material";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import moment from "moment";
import { CompanyModel } from "../../../../../ts/types/entity/other.types";
import { Entity } from "../../../../../ts/enums/other.enums";
import EditIcon from "@mui/icons-material/Edit";
import {useRouter} from "next/router";

export const AdminCompaniesList: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, list, lastPage } = useRootSelector(
        (state) => state.admin.companies
    );

    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(Entity.Company, page));
    };

    return (
        <Fragment>
            {loading ? (
                <Skeleton height={478} sx={{ my: 1 }} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={["ID", "Name", "Date IPO", "Activity", 'Show top', 'Edit']}
                    row={list.map((company: CompanyModel) => [
                        company.company_id,
                        company.name,
                        moment(company.date_ipo).format("ll"),
                        company?.activity?.name,
                        company?.show_top ? 'Yes' : 'No',
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <EditIcon
                                onClick={() =>
                                    router.push(
                                        `/admin/companies/${company.company_id}`
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
