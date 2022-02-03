import React from "react";
import Link, { LinkProps } from "next/link";

interface LinkWrapper extends LinkProps {
    className?: string;
}
export const LinkWrapper: React.FC<LinkWrapper> = ({
    children,
    className,
    ...other
}) => {
    return (
        <Link {...other}>
            <a className={className}>{children}</a>
        </Link>
    );
};
