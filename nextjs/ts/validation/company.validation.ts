import * as Yup from "yup";

export const CompanySchema = Yup.object().shape({
    name: Yup.string().min(3).max(120),
    ticker: Yup.string().min(1).required('Require field')
});
