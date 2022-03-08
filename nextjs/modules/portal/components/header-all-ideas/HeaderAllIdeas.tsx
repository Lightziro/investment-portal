import React from "react";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { Select } from "antd";
import { SORT_IDEAS } from "../../../../config/menu-items";
import { useTranslation } from "react-i18next";
import classes from "../../Portal.module.scss";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { ViewMode } from "../../ts/types/other.types";
import { viewModeColor } from "../../utils/view-mode.utils";
import { SelectField } from "../../../../components/ordinary/fields-form/select-field/SelectField";
const { Option } = Select;

interface HeaderAllIdeas {
    handleChange: (value) => void;
    viewMode: ViewMode;
    setMode: (value: ViewMode) => void;
}

export const HeaderAllIdeas: React.FC<HeaderAllIdeas> = ({
    handleChange,
    viewMode,
    setMode,
}) => {
    const { t } = useTranslation();
    return (
        <Paper elevation={2} className={classes.wrapperHeader}>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{t("Sorting")}:</Typography>
                    <SelectField
                        items={SORT_IDEAS.map((item) => {
                            item.label = t(item.label);
                            return item;
                        })}
                        handleChange={handleChange}
                        size="large"
                        type="ant"
                        defaultValue="idea_id"
                    />
                </Stack>
                <Stack direction="row" alignItems="center">
                    <IconButton
                        color={viewModeColor(viewMode, "simple")}
                        onClick={() => setMode("simple")}
                    >
                        <ViewModuleIcon />
                    </IconButton>
                    <IconButton
                        color={viewModeColor(viewMode, "tile")}
                        onClick={() => setMode("tile")}
                    >
                        <ViewStreamIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Paper>
    );
};
