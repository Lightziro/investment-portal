import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Portal } from "../modules/portal/Portal";
import { Admin } from "../modules/admin/Admin";
import { CreateInvestmentIdea } from "../modules/admin/create-investment-idea/CreateInvestmentIdea";

// ----------------------------------------------------------------------

export const MainRouter: React.FC = () => {
    return useRoutes([
        {
            path: "/admin",
            element: <Admin />,
            children: [
                { path: "investment-ideas", element: <CreateInvestmentIdea /> },
            ],
        },
        {
            path: "/",
            element: <Portal />,
            children: [
                // { path: "login", element: <Login /> },
                // { path: "register", element: <Register /> },
                // { path: "404", element: <NotFound /> },
                // { path: "/", element: <Navigate to="/dashboard" /> },
                // { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        // { path: "*", element: <Navigate to="/404" replace /> },
    ]);
};
