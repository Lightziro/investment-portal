import React from "react";
import { useRoutes } from "react-router-dom";
import { Portal } from "../modules/portal/Portal";
import { CreateInvestmentIdea } from "../modules/admin/create-investment-idea/CreateInvestmentIdea";
import { InvestmentIdeaPage } from "../modules/portal/investment-idea-page/InvestmentIdeaPage";
import { PortalLayout } from "../layouts/PortalLayout";
import { Auth } from "../modules/login-user/auth/Auth";
import { UserLoginLayout } from "../layouts/UserLoginLayout";
import { Register } from "../modules/login-user/register/Register";
import { AdminPanelLayout } from "../layouts/AdminPanelLayout";
import { UsersSection } from "../modules/admin/users-section/UsersSection";

// ----------------------------------------------------------------------

export const MainRouter: React.FC = () => {
    return useRoutes([
        {
            path: "/admin-panel",
            element: <AdminPanelLayout />,
            children: [
                // { path: "/", element: <div>Base</div> },
                { path: "investment-ideas", element: <CreateInvestmentIdea /> },
                { path: "users", element: <UsersSection /> },
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
