import * as Yup from "yup";

export const CreatePredictionSchema = Yup.object().shape({
    amount: Yup.number()
        .required("Is required field")
        .min(100, "Минимальная сумма ставки 100"),
});
