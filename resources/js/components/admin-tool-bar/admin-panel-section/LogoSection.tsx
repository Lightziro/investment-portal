import React from "react";
import { Link } from "react-router-dom";

export const LogoSection: React.FC = () => {
    return (
        <div className="header-bar-logo">
            <Link className="logo-link" to="/">
                <img src="/image/logo/logo.svg" />
            </Link>
        </div>
    );
};
