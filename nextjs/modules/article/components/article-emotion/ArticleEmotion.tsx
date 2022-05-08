import React from "react";
import { Grid, Paper } from "@mui/material";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import {
    changeEmotion,
    createEmotion,
} from "../../../../redux/actions/articleArtions";
import { EmotionItem } from "./emotion-item/EmotionItem";
import { ARTICLE_EMOTIONS } from "../../ts/consts/emotions";

interface ArticleEmotion {
    articleId: number;
}

export const ArticleEmotion: React.FC<ArticleEmotion> = ({ articleId }) => {
    const emotions = useRootSelector((state) => state.view.article.emotions);
    const { data } = useRootSelector((state) => state.user);
    const dispatch = useDispatch();

    const getCountEmotions = (codeEmotion: string) =>
        (emotions || []).filter(
            (emotion) => emotion.emotion_code === codeEmotion
        ).length;

    const existEmotion = (emotions || []).find(
        (emotion) => emotion.user_id === data?.user_id
    );
    const handleSetEmotion = (code) => {
        if (existEmotion) {
            if (existEmotion.emotion_code === code) {
                return;
            }
            dispatch(changeEmotion(articleId, existEmotion.emotion_id, code));
            return;
        }
        dispatch(createEmotion(articleId, code));
    };

    return (
        <Paper
            elevation={3}
            sx={{
                py: 1,
                px: 2,
            }}
        >
            <Grid container justifyContent="center">
                {ARTICLE_EMOTIONS.map((emotion) => (
                    <EmotionItem
                        handleSetEmotion={handleSetEmotion}
                        emotion={emotion}
                        getCountEmotions={getCountEmotions}
                    />
                ))}
            </Grid>
        </Paper>
    );
};
