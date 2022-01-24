import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { ArticleForm } from "../../../modules/admin/components/article-form/ArticleForm";
import { FormArticle } from "../../../ts/types/forms/form.types";
import { getViewEntity } from "../../../utils/api/get-data";
import { DtoEditArticle } from "../../../modules/admin/ts/types/response/admin-response-personal";
interface UpdateArticle {
    data: DtoEditArticle;
}
const UpdateArticle: NextPage<UpdateArticle> = ({ data }) => {
    const { t } = useTranslation();
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
    const data = await getViewEntity("article", context);
    return {
        props: {
            data,
        },
    };
};
