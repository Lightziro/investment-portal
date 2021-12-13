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
import { CreateIdeaDialog } from "../modules/admin/create-idea-section/CreateIdeaDialog";
import { SmartAnalytic } from "../modules/admin/smart-analytic/SmartAnalytic";
import { Profile } from "../modules/profile/Profile";
import { ArticlesSection } from "../modules/admin/articles-section/ArticlesSection";
import { ArticlePage } from "../modules/portal/article-page/ArticlePage";
import { ForgotPassword } from "../modules/login-user/forgot-password/ForgotPassword";
import { RecoveryPassword } from "../modules/login-user/recovery-password/RecoveryPassword";

// ----------------------------------------------------------------------

export const MainRouter: React.FC = () => {
    return useRoutes([
        {
            path: "/admin-panel",
            element: <AdminPanelLayout />,
            children: [
                // { path: "/", element: <div>Base</div> },
                {
                    path: "investment-ideas",
                    element: <CreateInvestmentIdea />,
                },
                { path: "users", element: <UsersSection /> },
                { path: "smart-analytic", element: <SmartAnalytic /> },
                { path: "articles", element: <ArticlesSection /> },
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
                {
                    path: "/profile/:userId",
                    element: <Profile />,
                },
                { path: "/article/:articleId", element: <ArticlePage /> },
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
                {
                    path: "forgot-password",
                    element: <ForgotPassword />,
                },
                {
                    path: "/recovery/:key",
                    element: <RecoveryPassword />,
                },
            ],
        },
        // { path: "*", element: <Navigate to="/404" replace /> },
    ]);
};
