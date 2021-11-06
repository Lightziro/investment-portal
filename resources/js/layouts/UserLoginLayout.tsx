import React from "react";
import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, Outlet } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

export const UserLoginLayout: React.FC = () => {
    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                className="picture-login"
                sx={{
                    backgroundImage:
                        "url(/image/picture/other/login-picture.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                className="wrapper-login"
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Link to="/">
                        <Avatar
                            src="/image/picture/other/back-icon.svg"
                            sx={{ m: 1, width: 60, height: 60 }}
                            className="back-icon"
                        />
                    </Link>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};
