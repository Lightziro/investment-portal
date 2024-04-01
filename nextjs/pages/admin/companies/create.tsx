import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import {CompanyForm} from "../../../modules/admin/components/company-form/CompanyForm";
import {FormArticle, FormCompany} from "../../../ts/types/forms/form.types";
import {axios} from "../../../utils/axios";
import {alertError, alertSuccess} from "../../../redux/actions/alertActions";
import {ErrorsResponse} from "../../../ts/enums/errors.enums";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const CreateCompany = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (form: FormCompany) => {

        await axios
            .post(`${process.env.API_URL}/api/admin/company`, form)
            .then((res) => {
                dispatch(alertSuccess("Article successfully posted"));
                router.push("/admin/companies");
            })
            .catch((e) => {
                const message = e.response.data.error ?? ErrorsResponse.Catch;
                dispatch(alertError(message))
            });
    };

    return (
        <MainLayout title={t("Companies")}>
            <AdminLayout>
                <CompanyForm callback={handleSubmit} buttonText={'Save'}/>
            </AdminLayout>
        </MainLayout>
    );
};
export default CreateCompany;
