import React, { Fragment, useState } from "react";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { fetchUsersByPage } from "../../../../redux/actions/admin/adminUsersActions";
import { useDispatch } from "react-redux";
import { RoleUserChip } from "../../../../components/simple/role-user-chip/RoleUserChip";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { EntityTable } from "../../../../components/simple/entity-table/EntityTable";

export const UsersList: React.FC = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const router = useRouter();
    const { list, lastPage } = useRootSelector((state) => state.admin.users);
    const handleChangePage = (e: React.ChangeEvent, page) => {
        setPage(page);
        dispatch(fetchUsersByPage(page));
    };
    return (
        <Fragment>
            {list.length ? (
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
                    row={list.map((user) => [
                        user.userId,
                        user.fullName,
                        user.sex,
                        <RoleUserChip role={user.roleName} />,
                        user.country.name,
                        moment(user.dateCreate).format("ll"),
                        moment(user.dateUpdate).format("ll"),
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() =>
                                router.push(`/admin/users/${user.userId}`)
                            }
                        >
                            <EditIcon />
                        </IconButton>,
                    ])}
                />
            ) : (
                <Skeleton height={240} variant="rectangular" />
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
