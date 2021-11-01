import React from "react";
interface LinkNewsItem {
    url: string;
    className: string;
}
export const LinkNewsItem: React.FC<LinkNewsItem> = ({
    children,
    url,
    className,
}) => {
    return (
        <a className={className} href={url} target="_blank">
            {children}
        </a>
    );
};
