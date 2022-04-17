import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import { HeaderPage } from "../components/header-page/HeaderPage";
import { useDispatch } from "react-redux";
import { fetchUserStats } from "../../../redux/actions/personal-account/userStatsActions";

export const PersonalAccountPage = ({}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserStats());
    }, []);
    return (
        <Paper sx={{ p: 2 }}>
            <HeaderPage title="Main">Child</HeaderPage>
        </Paper>
    );
};
