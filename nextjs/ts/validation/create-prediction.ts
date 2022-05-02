import * as Yup from "yup";

export const CreatePredictionSchema = Yup.object().shape({
    predict_price: Yup.number().required("Is required field"),
});
