import React from "react";
import { Icon } from "@iconify/react";
import { Badge, Stack } from "@mui/material";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import classes from "../../Article.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { createEmotion } from "../../../../redux/actions/articleArtions";

interface ArticleEmotion {
    articleId: number;
}

export const ArticleEmotion: React.FC<ArticleEmotion> = ({ articleId }) => {
    const emotions = useRootSelector((state) => state.view.article.emotions);
    const user = useRootSelector((state) => state.user);
    const dispatch = useDispatch();

    const getCountEmotions = (codeEmotion: string) =>
        (emotions || []).filter(
            (emotion) => emotion.emotion_code === codeEmotion
        ).length;

    const existEmotion = (emotions || []).find(
        (emotion) => emotion.user_id === user?.user_id
    );
    const handleSetEmotion = (code) => {
        if (existEmotion) {
            return;
        }
        dispatch(createEmotion(articleId, code));
    };

    return (
        <Stack spacing={2} direction="row">
            {[
                "twemoji:astonished-face",
                "twemoji:beaming-face-with-smiling-eyes",
                "twemoji:face-with-diagonal-mouth",
                "twemoji:fire",
            ].map((emotion) => (
                <Badge
                    badgeContent={getCountEmotions(emotion)}
                    color={
                        existEmotion?.emotion_code === emotion
                            ? "secondary"
                            : "primary"
                    }
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <Icon
                        className={classNames(
                            classes.emotionIcon,
                            existEmotion ? classes.exist : ""
                        )}
                        onClick={() => handleSetEmotion(emotion)}
                        icon={emotion}
                        width="50"
                        height="50"
                    />
                </Badge>
            ))}
        </Stack>
    );
};
