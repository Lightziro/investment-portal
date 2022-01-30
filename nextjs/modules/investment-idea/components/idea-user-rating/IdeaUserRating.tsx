import React from "react";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import classes from "../../InvestmentIdea.module.scss";
import { useTranslation } from "react-i18next";
interface IdeaUserRating {
    rating: number;
}
export const IdeaUserRating: React.FC<IdeaUserRating> = ({ rating }) => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
            <span className={classes.labelRating}>{t("Your assessment")}:</span>
            <Rating value={rating} readOnly size="large" />
        </Stack>
    );
};
