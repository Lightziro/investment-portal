import * as Yup from "yup";

export const RatingSchema = Yup.object().shape({
    score: Yup.number().min(1).max(5).required(),
});
