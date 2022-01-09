import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../ts/types/redux/store.types";
import Router from "next/router";

import { LoginPage } from "../modules/authorization/pages/login/LoginPage";

const Auth: NextPage = () => {
    const user = useSelector((store: StoreData) => store.user);
    if (user) {
        Router.push("/");
    }
    return <LoginPage />;
};

export default Auth;
