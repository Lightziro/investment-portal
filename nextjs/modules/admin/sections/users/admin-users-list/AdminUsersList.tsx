import React, { Fragment, useState } from "react";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import { fetchEntityList } from "../../../../../redux/actions/adminActions";
import { EntityTable } from "../../../../../components/simple/entity-table/EntityTable";
import { RoleUserChip } from "../../../../../components/simple/role-user-chip/RoleUserChip";
import { UserModel } from "../../../../../ts/types/entity/user.types";
import { Entity } from "../../../../../ts/enums/other.enums";

export const AdminUsersList: React.FC = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { list, lastPage, loading } = useRootSelector(
        (state) => state.admin.users
    );
    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchEntityList(Entity.User, page));
    };
    return (
        <Fragment>
            {loading ? (
                <Skeleton height={240} variant="rectangular" />
            ) : (
                <EntityTable
                    columns={[
                        "ID",
                        "Full name",
                        "Sex",
                        "Role",
                        "Country",
                        "Date create",
                        "Date update",
                        "Edit",
                    ]}
                    row={list.map((user: UserModel) => [
                        user.user_id,
                        user.full_name,
                        user.sex,
                        <RoleUserChip role={user.role?.name} />,
                        user.country?.name,
                        moment(user.created_at).format("ll"),
                        moment(user.updated_at).format("ll"),
                        <IconButton
                            color="primary"
                            component="span"
                            onClick={() =>
                                router.push(`/admin/users/${user.user_id}`)
                            }
                        >
                            <EditIcon />
                        </IconButton>,
                    ])}
                />
            )}
            {lastPage ? (
                <Stack alignItems="center">
                    <Pagination
                        onChange={handleChangePage}
                        count={lastPage}
                        defaultValue={page}
                        color="primary"
                    />
                </Stack>
            ) : (
                <Skeleton sx={{ mt: 2 }} height={32} variant="rectangular" />
            )}
        </Fragment>
    );
};
