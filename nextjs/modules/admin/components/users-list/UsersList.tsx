import React, { Fragment, useState } from "react";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { fetchUsersByPage } from "../../../../redux/actions/admin/adminUsersActions";
import { useDispatch } from "react-redux";
import { RoleUserChip } from "../../../../components/simple/role-user-chip/RoleUserChip";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Full name</th>
                            <th scope="col">sex</th>
                            <th scope="col">Role</th>
                            <th scope="col">Country</th>
                            <th scope="col">Date create</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((user) => (
                            <tr>
                                <th scope="row">{user.userId}</th>
                                <td>{user.fullName}</td>
                                <td>{user.sex}</td>
                                <td>
                                    <RoleUserChip role={user.roleName} />
                                </td>
                                <td>{user.country.name}</td>
                                <td>{moment(user.dateCreate).format("ll")}</td>
                                <td>
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={() =>
                                            router.push(
                                                `/admin/users/${user.userId}`
                                            )
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
