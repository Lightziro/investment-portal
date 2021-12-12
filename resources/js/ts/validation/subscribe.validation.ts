import * as Yup from "yup";

export const SubscribeEmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Is required field"),
});
