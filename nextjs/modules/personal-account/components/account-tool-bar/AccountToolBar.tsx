import React from "react";
import { MENU_PERSONAL_ACCOUNT } from "../../../../config/menu-items";
import { Stack } from "@mui/material";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import classes from "../../PersonalAccount.module.scss";
import { useRouter } from "next/router";

export const AccountToolBar: React.FC = () => {
    const router = useRouter();

    return (
        <div className="mt-3">
            <Stack direction="column">
                {MENU_PERSONAL_ACCOUNT.map((item) => (
                    <LinkWrapper className="mb-2" href={item.url}>
                        <span
                            className={`${classes.toolBarItem} ${
                                item.url === router.pathname
                                    ? classes.active
                                    : ""
                            }`}
                        >
                            {item.label}
                        </span>
                    </LinkWrapper>
                ))}
            </Stack>
        </div>
    );
};
