import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
interface PortalStatsIdea {
    amount: number | null;
    backgroundColor: string;
    text: string;
}
export const PortalStatsIdea: React.FC<PortalStatsIdea> = ({
    amount,
    backgroundColor,
    text,
}) => {
    return (
        <div className="invest-idea-wrapper">
            {amount ? (
                <div
                    style={{ backgroundColor: backgroundColor }}
                    className="card-idea"
                >
                    <Box padding={2}>
                        <div className="card-content-wrapper">
                            <div className="icon-wrapper">
                                <Icon
                                    width={24}
                                    height={24}
                                    icon="ant-design:star-outlined"
                                />
                            </div>
                            <div className="card-text-content">
                                <span className="content-amount">
                                    {amount}$
                                </span>
                                <span className="content-text">{text}</span>
                            </div>
                        </div>
                    </Box>
                </div>
            ) : (
                <Skeleton variant="rectangular" width="100%" height={71} />
            )}
        </div>
    );
};
