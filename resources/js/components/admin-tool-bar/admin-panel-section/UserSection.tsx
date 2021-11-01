import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";

export const UserSection: React.FC = () => {
    const user = useSelector((state: StoreData) => state.main.user);
    return (
        <div className="bar-section-user">
            <div className="user-wrapper">
                <div className="avatar-wrapper">
                    <img src="/image/picture/avatar_default.jpg" />
                </div>
                <div className="name-wrapper">
                    <span>
                        {user &&
                            (user.secondName
                                ? `${user.secondName} ${user.firstName}`
                                : user.userName)}
                    </span>
                </div>
            </div>
        </div>
    );
};
