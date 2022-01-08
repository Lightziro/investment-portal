import React from "react";
import Link from "next/link";
import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Card } from "../card/Card";

export const PortalAd: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Card backgroundColor="#b0deff">
            <img
                className="main-picture-portal"
                src="/images/picture/other/svg-editor-image.svg"
            />
            <Typography.Title level={3}>
                {t("Earn on the fall and on the growth stocks")}
            </Typography.Title>
            <Link href="/company-goal">
                <Button type="primary">{t("More detailed")}</Button>
            </Link>
        </Card>
    );
};
