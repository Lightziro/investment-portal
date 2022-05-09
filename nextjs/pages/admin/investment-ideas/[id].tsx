import { GetServerSidePropsContext, NextPage } from "next";
import { getEntityAdmin } from "../../../utils/api/get-data";
import { DtoIdeaItem } from "../../../modules/admin/ts/types/response/admin-response-item.types";
import { AdminIdeaPage } from "../../../modules/admin/pages/admin-idea-page/admin-idea-page";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { DtoPersonalIdea } from "../../../modules/admin/ts/types/response/admin-response-personal";
import { Entity } from "../../../ts/enums/other.enums";

interface InvestmentIdeaEdit {
    data: DtoPersonalIdea;
}
const InvestmentIdeaEdit: NextPage<InvestmentIdeaEdit> = ({ data }) => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Edit idea")}>
            <AdminLayout>
                <AdminIdeaPage idea={data} />
            </AdminLayout>
        </MainLayout>
    );
};
export default InvestmentIdeaEdit;
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.params;
    const data: DtoIdeaItem = await getEntityAdmin(
        Number(id),
        Entity.InvestmentIdea,
        context
    );
    return {
        props: {
            data,
        },
    };
};
