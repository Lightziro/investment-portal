import React from "react";
import { MENU_PERSONAL_ACCOUNT } from "../../../../config/menu-items";
import { Stack } from "@mui/material";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styles from "./AccountToolBar.module.scss";
import cn from "classnames";
export const AccountToolBar: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className="mt-3">
            <div className={styles.list}>
                {MENU_PERSONAL_ACCOUNT.map((item) => (
                    <LinkWrapper
                        className={cn(styles.blockMenu, {
                            [styles.active]: item.url === router.pathname,
                        })}
                        href={item.url}
                    >
                        <span>{t(item.label)}</span>
                    </LinkWrapper>
                ))}
            </div>
        </div>
    );
};
