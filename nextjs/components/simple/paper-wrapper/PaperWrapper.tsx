import React from "react";
import classnames from "classnames";
interface PaperWrapper {
    className?: string;
}
export const PaperWrapper: React.FC<PaperWrapper> = ({
    children,
    className,
}) => {
    return (
        <div className={classnames("paper-wrapper", className)}>{children}</div>
    );
};
