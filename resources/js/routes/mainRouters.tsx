import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Portal } from "../modules/portal/Portal";
import { Admin } from "../modules/admin/Admin";
import { CreateInvestmentIdea } from "../modules/admin/create-investment-idea/CreateInvestmentIdea";
import { InvestmentIdeaPage } from "../modules/portal/investment-idea-page/InvestmentIdeaPage";
import { PortalLayout } from "../layouts/PortalLayout";

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
                    path: "/investment-idea/:id",
                    element: <InvestmentIdeaPage />,
                },
                {
                    path: "/",
                    element: <Portal />,
                },
                // { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        // { path: "*", element: <Navigate to="/404" replace /> },
    ]);
};
