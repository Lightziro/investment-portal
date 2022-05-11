import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
interface HeaderSection {
    urlRedirect?: string;
    textButton?: string;
    previewText: string;
}
export const HeaderSection: React.FC<HeaderSection> = ({
    urlRedirect,
    textButton,
    previewText,
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
        >
            <Typography variant="h4" gutterBottom>
                {t(previewText)}
            </Typography>
            {textButton && (
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon icon="ant-design:plus-outlined" />}
                    onClick={() => router.push(urlRedirect)}
                >
                    {t(textButton)}
                </Button>
            )}
        </Stack>
    );
};
