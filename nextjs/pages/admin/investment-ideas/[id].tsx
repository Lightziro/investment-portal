import { GetServerSidePropsContext, NextPage } from "next";
import { getArticle } from "../../../utils/api/get-data";

interface InvestmentIdeaEdit {
    data: any;
}
const InvestmentIdeaEdit: NextPage<InvestmentIdeaEdit> = ({ data }) => {
    return <div>Test23</div>;
};
export default InvestmentIdeaEdit;
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.params;
    const data = await getArticle(id, context);
    return {
        props: {
            data,
        },
    };
};
