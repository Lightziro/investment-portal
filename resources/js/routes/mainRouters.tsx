import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Portal } from "../modules/portal/Portal";
import { Admin } from "../modules/admin/Admin";
import { CreateInvestmentIdea } from "../modules/admin/create-investment-idea/CreateInvestmentIdea";
import { InvestmentIdeaPage } from "../modules/portal/investment-idea-page/InvestmentIdeaPage";
import { PortalLayout } from "../layouts/PortalLayout";
import { Auth } from "../modules/login-user/auth/Auth";
import { UserLoginLayout } from "../layouts/UserLoginLayout";
import { Register } from "../modules/login-user/register/Register";

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
            element: <PortalLayout />,
            children: [
                {
                    path: "/investment-idea/:ideaId",
                    element: <InvestmentIdeaPage />,
                },
                {
                    path: "/",
                    element: <Portal />,
                },
                // { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        {
            path: "/",
            element: <UserLoginLayout />,
            children: [
                {
                    path: "/auth",
                    element: <Auth />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
            ],
        },
        // { path: "*", element: <Navigate to="/404" replace /> },
    ]);
};
