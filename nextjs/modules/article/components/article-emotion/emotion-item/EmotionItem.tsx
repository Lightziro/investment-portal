import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import classes from "../../../Article.module.scss";
import { EmotionItem as Item } from "../../../../../ts/types/other/other.types";

interface EmotionItem {
    emotion: Item;
    getCountEmotions: (code: string) => number;
    handleSetEmotion: (code: string) => void;
}

export const EmotionItem: React.FC<EmotionItem> = ({
    emotion,
    getCountEmotions,
    handleSetEmotion,
}) => {
    const [hover, setHover] = useState(false);
    return (
        <Stack
            direction="column"
            alignItems="center"
            className={classes.emotionWrapper}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ backgroundColor: hover ? emotion.color : "transparent" }}
        >
            <Icon
                className={classes.emotionIcon}
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
