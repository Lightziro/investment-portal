import {NextPage} from "next";
import {MainLayout} from "../../../layouts/MainLayout";
import {AdminLayout} from "../../../layouts/AdminLayout";
import {useTranslation} from "react-i18next";
import {FormCompany} from "../../../ts/types/forms/form.types";
import {useRouter} from "next/router";
import {axios} from "../../../utils/axios";
import {useDispatch} from "react-redux";
import {alertError, alertSuccess} from "../../../redux/actions/alertActions";
import {ErrorsResponse} from "../../../ts/enums/errors.enums";
import {CompanyModel} from "../../../ts/types/entity/other.types";
import {CompanyForm} from "../../../modules/admin/components/company-form/CompanyForm";
import {useEffect, useState} from "react";


const UpdateCompany: NextPage = ({}) => {
    const {t} = useTranslation();
    const router = useRouter();
    const [editCompany, setEditCompany] = useState<CompanyModel>(null);
    const dispatch = useDispatch();
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`${process.env.API_URL}/api/admin/company/${id}`)
                .then((res) => setEditCompany(res.data))
                .catch((e) => {
                    dispatch(alertError("Couldn't find the company"));
                    router.push("/admin/companies");
                });
        }
    }, [id]);
    const handleSubmit = async (form: FormCompany) => {
        await axios
            .post(
                `${process.env.API_URL}/api/admin/company/${editCompany.company_id}`,
                form
            )
            .then((res) => {
                dispatch(alertSuccess("Company successfully updated"));
                router.push("/admin/companies");
            })
            .catch((e) => {
                const message = e.response.data.error ?? ErrorsResponse.Catch;
                dispatch(alertError(message))
            });
    };

    return (
        <MainLayout title={t("Update article")}>
            <AdminLayout>
                {editCompany &&
                    <CompanyForm callback={handleSubmit} company={editCompany} buttonText={'Update'}/>}
            </AdminLayout>
        </MainLayout>
    );
};
export default UpdateCompany;
