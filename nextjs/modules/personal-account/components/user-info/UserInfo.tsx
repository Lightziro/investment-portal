import React, { Fragment } from "react";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import styles from "./UserInfo.module.scss";

export const UserInfo = () => {
    const { data } = useRootSelector((state) => state.user);
    return (
        <div className={styles.wrapper}>
            <UserAvatar width={150} height={150} avatar={data.avatar} />
            <div className={styles.name}>{data.full_name}</div>
        </div>
    );
};
