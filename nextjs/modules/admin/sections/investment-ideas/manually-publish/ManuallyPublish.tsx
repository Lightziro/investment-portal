import React from "react";
import { Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ManuallyPublish {
    setManually: () => void;
}

const ManuallyPublish: React.FC<ManuallyPublish> = ({ setManually }) => {
    const { t } = useTranslation();
    return (
        <Container maxWidth="sm">
            <Typography gutterBottom variant="h5" component="p" align="center">
                {t(
                    "Investment idea was not analyzed by a smart system. Do you want to specify the data manually?"
                )}
            </Typography>
            <Button onClick={setManually} fullWidth variant="contained">
                {t("Confirm")}
            </Button>
        </Container>
    );
};
export default ManuallyPublish;
