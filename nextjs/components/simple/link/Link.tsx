import React from "react";
import Link, { LinkProps } from "next/link";

interface LinkWrapper extends LinkProps {
    className?: string;
    children: React.ReactNode;
}
export const LinkWrapper: React.FC<LinkWrapper> = ({
    children,
    className,
    ...other
}) => {
    return (
        <Link className={className} {...other}>
            {children}
        </Link>
    );
};
