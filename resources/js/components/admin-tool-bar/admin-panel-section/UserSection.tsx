import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../../nextjs/ts/types/redux/store.types";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export const UserSection: React.FC = () => {
    const user = useSelector((state: StoreData) => state.main.user);

    return (
        <div className="bar-section-user">
            {user ? (
                <Link to="/profile">
                    <div className="user-wrapper">
                        <div className="avatar-wrapper">
                            <img src="/image/picture/avatar_default.jpg" />
                        </div>
                        <div className="name-wrapper">
                            <span className="full-name">{user.fullName}</span>
                            <span className="role">{user.role}</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <Skeleton variant="rectangular" height={77} />
            )}
        </div>
    );
};
