import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { ArticleForm } from "../../../modules/admin/components/article-form/ArticleForm";
import { FormArticle } from "../../../ts/types/forms/form.types";
import { getEntityAdmin } from "../../../utils/api/get-data";
import { ArticleModel } from "../../../ts/types/entity/article.types";
import { useRouter } from "next/router";
import { Entity } from "../../../ts/enums/other.enums";
import { axios } from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";

interface UpdateArticle {
    data: ArticleModel;
}
const UpdateArticle: NextPage<UpdateArticle> = ({ data }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSubmit = async (form: FormArticle) => {
        let formData = new FormData();
        Object.keys(form).map((key) => formData.append(key, form[key]));
        await axios
            .post(
                `${process.env.API_URL}/api/admin/article/${data.article_id}`,
                formData
            )
            .then((res) => {
                dispatch(alertSuccess("Article successfully updated"));
                router.push("/admin/articles");
            })
            .catch((e) => dispatch(alertError("Failed update article")));
    };
    if (!data) {
        return router.push("/404");
    }

    return (
        <MainLayout title={t("Update article")}>
            <AdminLayout>
                <ArticleForm
                    buttonText="Update"
                    article={data}
                    callback={handleSubmit}
                />
            </AdminLayout>
        </MainLayout>
    );
};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.params;
    const data = await getEntityAdmin(Number(id), Entity.Article, context);
    return {
        props: {
            data,
        },
    };
};
export default UpdateArticle;
