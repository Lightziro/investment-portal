import { GetServerSidePropsContext, NextPage } from "next";
import { getEntityAdmin } from "../../../utils/api/get-data";
import { AdminEntity } from "../../../redux/ts/enums/admin/admin.enum";
import { DtoIdeaItem } from "../../../modules/admin/ts/types/response/admin-response-item.types";

interface InvestmentIdeaEdit {
    data: DtoIdeaItem;
}
const InvestmentIdeaEdit: NextPage<InvestmentIdeaEdit> = ({ data }) => {
    console.log(data);
    return <div>Test23</div>;
};
export default InvestmentIdeaEdit;
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.params;
    const data: DtoIdeaItem = await getEntityAdmin(
        id,
        AdminEntity.InvestmentIdea,
        context
    );
    return {
        props: {
            data,
        },
    };
};
