import React, { useContext } from "react";
import { Avatar, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";

export const ProfilePredictions: React.FC = () => {
    const { profile } = useContext(ProfileContext);
    const { t } = useTranslation();
    return (
        <Paper sx={{ px: 2, py: 1 }} elevation={2}>
            <Typography gutterBottom variant="h6">
                {t("Prediction user")}
            </Typography>
            <Divider />
            <Grid
                sx={{ mt: 1 }}
                justifyContent="center"
                direction="row"
                container
                spacing={1}
            >
                {profile.predictions.length ? (
                    profile.predictions.map((prediction) => (
                        <Grid
                            md={3}
                            container
                            justifyContent="center"
                            item
                            alignItems="center"
                            direction="row"
                        >
                            <Avatar
                                sx={{ mr: 2 }}
                                src={`${process.env.API_URL}/storage/${prediction.company.logo_path}`}
                            />
                            <Chip
                                sx={{ mr: 1 }}
                                label={prediction.company.name}
                                color="primary"
                            />

                            <Typography component="span" variant="subtitle2">
                                {prediction.predict_price}$
                            </Typography>
                        </Grid>
                    ))
                ) : (
                    <Empty
                        description={t("This user has no open predictions")}
                    />
                )}
            </Grid>
        </Paper>
    );
};
