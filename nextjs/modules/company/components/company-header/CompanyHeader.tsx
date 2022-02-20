import React from "react";
import {
    Chip,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { alertInfo } from "../../../../redux/actions/alertActions";

interface CompanyHeader {
    name: string;
    activity: string | null;
    currency: string;
    ticker: string;
}

export const CompanyHeader: React.FC<CompanyHeader> = ({
    name,
    activity,
    currency,
    ticker,
}) => {
    const dispatch = useDispatch();
    const handleShare = () => {
        dispatch(alertInfo("Success copy")); // todo: заменить текст
        navigator.clipboard.writeText(document.location.href);
    };
    return (
        <Paper
            sx={{ px: 2, py: 2 }}
            className="d-flex justify-content-between align-items-center"
        >
            <Stack justifyContent="space-between" direction="row" spacing={2}>
                <Typography variant="h5">
                    {name} ({ticker})
                </Typography>
                <Divider orientation="vertical" />
                {activity && <Chip label={activity} />}
                <Chip label={currency} />
            </Stack>
            <IconButton onClick={handleShare}>
                <ShareIcon />
            </IconButton>
        </Paper>
    );
};
