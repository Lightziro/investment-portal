import React, { Fragment } from "react";
interface Page {
    title: string;
}
export const Page: React.FC<Page> = ({ children, title }) => {
    return (
        <Fragment>
            <title>{title}</title>
            {children}
        </Fragment>
    );
};
