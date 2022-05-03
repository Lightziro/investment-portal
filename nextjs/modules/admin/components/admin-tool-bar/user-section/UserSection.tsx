import React from "react";
import { Skeleton } from "@mui/material";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import Link from "next/link";
import classes from "../AdminToolBar.module.scss";
import { UserAvatar } from "../../../../../components/simple/user-avatar/UserAvatar";

export const UserSection: React.FC = () => {
    const { data } = useRootSelector((store) => store.user);
    // TODO: Перевести Link по блокам
    return (
        <div className={classes.barSectionUser}>
            {data ? (
                <Link
                    href="/profile/[id]"
                    as={`/profile/${data.user_id}`}
                    passHref
                >
                    <div className={classes.userWrapper}>
                        <div className={classes.avatarWrapper}>
                            <UserAvatar avatar={data.avatar} />
                        </div>
                        <div className={classes.nameWrapper}>
                            <span className={classes.fullName}>
                                {data.full_name}
                            </span>
                            <span className={classes.role}>{data.role}</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <Skeleton variant="rectangular" height={77} />
            )}
        </div>
    );
};
