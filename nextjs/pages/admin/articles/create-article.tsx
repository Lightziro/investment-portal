import { NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { ArticleForm } from "../../../modules/admin/components/article-form/ArticleForm";
import { FormArticle } from "../../../ts/types/forms/form.types";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";
import { useRouter } from "next/router";
import { axios } from "../../../utils/axios";
import { ErrorsResponse } from "../../../ts/enums/errors.enums";

const CreateArticle: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleSubmit = async (form: FormArticle) => {
        let formData = new FormData();

        Object.keys(form).map((key) => formData.append(key, form[key]));

        await axios
            .post(`${process.env.API_URL}/api/admin/article`, formData)
            .then((res) => {
                dispatch(alertSuccess("Article successfully posted"));
                router.push("/admin/articles");
            })
            .catch((e) => dispatch(alertError(ErrorsResponse.Catch)));
    };
    return (
        <MainLayout title={t("Create article")}>
            <AdminLayout>
                <ArticleForm buttonText="Create" callback={handleSubmit} />
            </AdminLayout>
        </MainLayout>
    );
};
export default CreateArticle;
