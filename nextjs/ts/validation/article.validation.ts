import * as Yup from "yup";

export const ArticleSchema = Yup.object().shape({
    title: Yup.string().min(20).max(120).required("Require field"),
});
