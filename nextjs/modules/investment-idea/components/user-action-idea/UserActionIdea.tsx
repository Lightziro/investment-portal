import React from "react";
import { Card, Typography } from "@mui/material";

export const UserActionIdea: React.FC = () => {
    return (
        <Card sx={{ bgcolor: "white", p: 2 }} className="shadow-wrapper">
            <Typography variant="h5">Action user</Typography>
        </Card>
    );
};
