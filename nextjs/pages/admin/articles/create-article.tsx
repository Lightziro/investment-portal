import { NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { ArticleForm } from "../../../modules/admin/components/article-form/ArticleForm";
import { axios } from "../../../utils/axios";
import { FormArticle } from "../../../ts/types/forms/form.types";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";
import { useRouter } from "next/router";

const CreateArticle: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = async (form: FormArticle) => {
        let formData = new FormData();
        Object.keys(form).map((key) => formData.append(key, form[key]));
        await axios
            .post(`${process.env.API_URL}/api/admin/test`, formData)
            .then((res) => {
                dispatch(alertSuccess("Article successfully posted"));
                router.push("/admin/articles");
            })
            .catch((e) => dispatch(alertError("Failed create article")));
    };
    return (
        <MainLayout title={t("Create article")}>
            <AdminLayout>
                <ArticleForm callback={handleSubmit} />
            </AdminLayout>
        </MainLayout>
    );
};
export default CreateArticle;
