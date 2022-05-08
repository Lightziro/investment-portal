import React, { useEffect } from "react";
import classes from "../styles/layouts.module.scss";
import { AdminToolBar } from "../modules/admin/components/admin-tool-bar/AdminToolBar";
import { useRootSelector } from "../hooks/useTypeSelector";
import { useRouter } from "next/router";
import { checkNoRootAdmin } from "../utils/user/user-check-root";

export const AdminLayout: React.FC = ({ children }) => {
    const { fetch, data } = useRootSelector((state) => state.user);
    const router = useRouter();
    useEffect(() => {
        if (checkNoRootAdmin(fetch, data)) {
            router.push("/");
        }
    }, [data, fetch]);

    if (!data || !fetch) {
        return null;
    }
    return (
        <div className={classes.adminContainer}>
            <header className={classes.headerPanel}>
                <div className="search-logo" />
            </header>
            <AdminToolBar />
            <div className={classes.adminSectionWrapper}>{children}</div>
        </div>
    );
};
