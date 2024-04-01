import { CompanyView } from "../../../redux/ts/types/view/view-store.types";
import {FormArticle, FormCompany} from "../../types/forms/form.types";

export const initialCompanyView: CompanyView = {
    epsStats: null,
    analyticsStats: null,
    netMarginStats: null,
    salePerShare: null
};

export const initialCompanyForm: FormCompany = {
    name: "",
    ticker: "",
    show_top: false,
    autoFill: true,
};

