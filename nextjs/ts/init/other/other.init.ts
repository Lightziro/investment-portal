import { Sex } from "../../types/other/other.types";
import { FormParamsAnalyze } from "../../types/forms/form.types";

export const sexList: Sex[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];
export const initialParamsAnalyze: FormParamsAnalyze = {
    monthPeriod: 3,
};
