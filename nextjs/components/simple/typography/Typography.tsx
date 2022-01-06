import React from "react";
import { Typography as AntTypography } from "antd";
import { TitleProps } from "antd/lib/typography/Title";

interface Typography extends TitleProps {
    align?: "left" | "center" | "right";
}
export const Typography: React.FC<Typography> = ({
    children,
    align = "center",
    ...other
}) => {
    return (
        <AntTypography.Title style={{ textAlign: align }} {...other}>
            {children}
        </AntTypography.Title>
    );
};
