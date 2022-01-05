import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../nextjs/ts/types/redux/store.types";
import axios from "axios";
import { setUserData } from "../../nextjs/redux/actions/mainActions";
import { MainRouter } from "./routes/mainRouters";
import { SnackbarAlert } from "./components/snackbar-alert/SnackbarAlert";

export const Base: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: StoreData) => store.main.user);
    useEffect(() => {
        if (!user) {
            axios
                .get("/api/user/authentication")
                .then((res) => dispatch(setUserData(res.data)));
        }
    }, []);
    return (
        <Router>
            <MainRouter />
            <SnackbarAlert />
        </Router>
    );
};
