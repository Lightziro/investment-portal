import React, { useState } from "react";
import Link from "next/link";
import { LanguageMenu } from "./language-menu/LanguageMenu";
import { NoticeMenu } from "./notice-menu/NoticeMenu";
import classes from "../../../../styles/nav-bar.module.scss";
import { ProfileMenu } from "./profile-menu/ProfileMenu";
import { SearchEntities } from "./search-entities/SearchEntities";
import { ExchangeTimeMenu } from "./exchange-tim-menu/ExchangeTimeMenu";
import classnames from "classnames";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import styles from "./PortalNavBar.module.scss";
import { formatNumber } from "../../../../utils/other";
import { useRouter } from "next/router";
import cn from "classnames";
import { useParams, usePathname } from "next/navigation";
import { setOpenSheet } from "../../../../redux/actions/sheetActions";
import { useDispatch } from "react-redux";

export const PortalNavBar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const user = useRootSelector((state) => state.user.data);
    const [open, setOpen] = useState({
        language: false,
        notice: false,
        profile: false,
        time: false,
    });
    const handleOpen = (state: boolean, name: string) => {
        setOpen({ ...open, [name]: state });
    };

    const handleUp = () => {
        dispatch(setOpenSheet("upBalance", {}));
    };

    const noticesWithoutView = user.notices.filter((t) => !t.viewed).length;

    return (
        <nav className={styles.bottomNav}>
            <div className={styles.navContainer}>
                <div className={styles.navItemWrapper}>
                    <button
                        className={cn(styles.navItem, {
                            [styles.active]: pathname === "/",
                        })}
                        onClick={() => router.push("/")}
                    >
                        <svg className={styles.navIcon} viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9,22 9,12 15,12 15,22"></polyline>
                        </svg>
                    </button>
                </div>

                <div className={styles.navItemWrapper}>
                    <button
                        className={cn(styles.navItem, {
                            [styles.active]:
                                pathname === "/companies" ||
                                pathname.includes("/company"),
                        })}
                        onClick={() =>
                            router.push("/personal-account/predictions")
                        }
                    >
                        <svg className={styles.navIcon} viewBox="0 0 24 24">
                            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                        </svg>
                    </button>
                </div>

                <div className={styles.navItemWrapper}>
                    <button
                        className={`${styles.navItem} ${styles.balanceItem}`}
                        onClick={handleUp}
                    >
                        <img src="/images/picture/tg-star.svg" />
                        <span className={styles.navLabel}>
                            {formatNumber(user.balance)}
                        </span>
                    </button>
                </div>

                <div className={styles.navItemWrapper}>
                    <button
                        className={`${styles.navItem}`}
                        onClick={() => router.push("/personal-account/notices")}
                    >
                        <svg className={styles.navIcon} viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10,9 9,9 8,9"></polyline>
                        </svg>
                    </button>
                    {noticesWithoutView > 0 && (
                        <div className={styles.badge}>
                            {user.notices.filter((t) => !t.viewed).length}
                        </div>
                    )}
                </div>

                <div className={styles.navItemWrapper}>
                    <button
                        className={`${styles.navItem} `}
                        onClick={() => router.push("/personal-account")}
                    >
                        <svg className={styles.navIcon} viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );

    return (
        <header className={classnames("container", classes.portalNavBar)}>
            <div className={classes.navBarWrapper}>
                <div className={classes.logoWrapper}>
                    <Link href="/" passHref>
                        <img src="/images/logo/logo-hub.png" />
                    </Link>
                </div>
                {/*<SearchEntities />*/}
                <div className={classes.emptyBlock} />
                {user && (
                    <div className={classes.balanceBlock}>
                        <span>{user?.balance || 0}</span>
                        <img src="/images/picture/tg-star.svg" />
                    </div>
                )}
                <LanguageMenu
                    open={open.language}
                    onClose={() => handleOpen(false, "language")}
                    onOpen={() => handleOpen(true, "language")}
                />
                <NoticeMenu
                    onClose={() => handleOpen(false, "notice")}
                    onOpen={() => handleOpen(true, "notice")}
                    open={open.notice}
                />
                <ProfileMenu
                    open={open.profile}
                    onOpen={() => handleOpen(true, "profile")}
                    onClose={() => handleOpen(false, "profile")}
                />
            </div>
        </header>
    );
};
