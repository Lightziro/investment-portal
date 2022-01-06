import React from "react";
import { Col, Row } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import classes from "../styles/layouts.module.scss";
import { Avatar, Box } from "@mui/material";
import Link from "next/link";

export const AuthLayout: React.FC = ({ children }) => {
    return (
        <Row className={classes.wrapper}>
            <Col xs={false} sm={4} md={7}>
                <div className={classes.pictureLogin} />
            </Col>
            <Col
                // item
                xs={12}
                sm={8}
                md={5}
                className="wrapper-login"
                // component={Paper}
                // elevation={6}
                // square
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
                    <Link href="/">
                        <Avatar
                            src="/images/picture/other/back-icon.svg"
                            sx={{ m: 1, width: 60, height: 60 }}
                            className="back-icon"
                        />
                    </Link>
                    {children}
                </Box>
            </Col>
        </Row>
    );
};
