import React, { useEffect, useState } from "react";
import {
    GetServerSidePropsContext,
    GetStaticPropsContext,
    NextPage,
} from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import getTitleIdea from "../../modules/investment-idea/utils/get-title-idea";
import { InvestmentIdeaPage } from "../../modules/investment-idea/InvestmentIdeaPage";
import { getViewEntity } from "../../utils/api/get-data";
import { PortalLayout } from "../../layouts/PortalLayout";
import { useRouter } from "next/router";
import { InvestmentIdeaView } from "../../redux/ts/types/view/view-store.types";
interface InvestmentIdea {
    idea: InvestmentIdeaView;
}
const InvestmentIdea: NextPage<InvestmentIdea> = ({ idea }) => {
    const { t } = useTranslation();
    const router = useRouter();
    // const [idea, setIdea] = useState(idea);
    useEffect(() => {
        if (!idea) {
            router.push("/404");
        }
    }, [idea]);
    if (!idea) {
        return null;
    }
    return (
        <MainLayout
            title={`${t("Investment idea")} - ${getTitleIdea(
                idea.companyInfo
            )}`}
        >
            <PortalLayout>
                <InvestmentIdeaPage ideaData={idea} />
            </PortalLayout>
        </MainLayout>
    );
};
export default InvestmentIdea;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const idea = await getViewEntity("idea", context);
    return {
        props: {
            idea,
        },
    };
};
//
// export async function getStaticPaths() {
//     const ideasKey: any = await axios
//         .get(`${process.env.API_URL_DOCKER}/api/idea/all-key`)
//         .then((res) => {
//             console.log(res.data);
//             return res.data;
//         });
//     const paths = ideasKey.map((idea) => ({
//         params: { id: idea.idea_id.toString() },
//     }));
//
//     return { paths, fallback: "blocking" };
// }
