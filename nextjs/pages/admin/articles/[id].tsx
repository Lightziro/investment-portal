import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { ArticleForm } from "../../../modules/admin/components/article-form/ArticleForm";
import { FormArticle } from "../../../ts/types/forms/form.types";
import { getEntityAdmin } from "../../../utils/api/get-data";
import { AdminEntity } from "../../../redux/ts/enums/admin/admin.enum";
import { ArticleModel } from "../../../ts/types/entity/article.types";
import { useRouter } from "next/router";

interface UpdateArticle {
    data: ArticleModel;
}
const UpdateArticle: NextPage<UpdateArticle> = ({ data }) => {
    const { t } = useTranslation();
    const router = useRouter();
    // const dispatch = useDispatch();
    // const handleSubmit = async (form: FormArticle) => {
    //     let formData = new FormData();
    //     Object.keys(form).map((key) => formData.append(key, form[key]));
    //     await axios
    //         .post(`${process.env.API_URL}/api/admin/test`, formData)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((e) => dispatch(alertError("Failed create article")));
    // };
    const handleSubmit = (form: FormArticle) => {
        console.log(form);
    };
    return (
        <MainLayout title={t("Create article")}>
            <AdminLayout>
                <ArticleForm article={data} callback={handleSubmit} />
            </AdminLayout>
        </MainLayout>
    );
};
export default UpdateArticle;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.params;
    const data = await getEntityAdmin(Number(id), AdminEntity.Article, context);
    return {
        props: {
            data,
        },
    };
};
