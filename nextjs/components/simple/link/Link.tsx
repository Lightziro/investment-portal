import React from "react";
import Link, { LinkProps } from "next/link";
export const LinkWrapper: React.FC<LinkProps> = ({ children, ...other }) => {
    return (
        <Link {...other}>
            <a>{children}</a>
        </Link>
    );
};
