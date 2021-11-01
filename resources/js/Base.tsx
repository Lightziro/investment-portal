import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "./ts/types/redux/store.types";
import axios from "axios";
import { setUserData } from "./redux/actions/mainActions";
import { MainRouter } from "./routes/mainRouters";

export const Base: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: StoreData) => store.main.user);
    useEffect(() => {
        if (!user) {
            console.log("TOP4ik");
            axios
                .get("/api/user/authentication")
                .then((res) => dispatch(setUserData(res.data)));
        }
    }, []);
    return (
        <Router>
            <MainRouter />
        </Router>
    );
};
