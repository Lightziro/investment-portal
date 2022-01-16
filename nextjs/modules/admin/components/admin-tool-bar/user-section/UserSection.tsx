import React from "react";
import { Skeleton } from "@mui/material";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";
import Link from "next/link";
import classes from "../AdminToolBar.module.scss";
import { UserAvatar } from "../../../../../components/simple/user-avatar/UserAvatar";

export const UserSection: React.FC = () => {
    const user = useRootSelector((store) => store.user);
    // TODO: Перевести Link по блокам
    return (
        <div className={classes.barSectionUser}>
            {user ? (
                <Link
                    href="/profile/[id]"
                    as={`/profile/${user.userId}`}
                    passHref
                >
                    <div className={classes.userWrapper}>
                        <div className={classes.avatarWrapper}>
                            <UserAvatar avatar={user.avatar} />
                        </div>
                        <div className={classes.nameWrapper}>
                            <span className={classes.fullName}>
                                {user.fullName}
                            </span>
                            <span className={classes.role}>{user.role}</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <Skeleton variant="rectangular" height={77} />
            )}
        </div>
    );
};
