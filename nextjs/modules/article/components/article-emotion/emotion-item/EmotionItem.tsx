import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import classes from "../../../Article.module.scss";
import { EmotionItem as Item } from "../../../../../ts/types/other/other.types";
import { useRootSelector } from "../../../../../hooks/useTypeSelector";

interface EmotionItem {
    emotion: Item;
    getCountEmotions: (code: string) => number;
    handleSetEmotion: (code: string) => void;
    loadEmotion: boolean;
}

export const EmotionItem: React.FC<EmotionItem> = ({
    emotion,
    getCountEmotions,
    handleSetEmotion,
    loadEmotion,
}) => {
    const [hover, setHover] = useState(false);
    const { fetch, data } = useRootSelector((state) => state.user);
    const authUser = fetch && data;
    return (
        <Stack
            direction="column"
            alignItems="center"
            className={classes.emotionWrapper}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? emotion.color : "transparent",
                cursor: authUser && !loadEmotion ? "pointer" : "not-allowed",
            }}
        >
            <Icon
                onClick={() => handleSetEmotion(emotion.name)}
                icon={emotion.name}
                width="50"
                height="50"
                color={hover ? "white" : emotion.color}
            />
            <Typography variant="button">
                {getCountEmotions(emotion.name)}
            </Typography>
        </Stack>
    );
};
