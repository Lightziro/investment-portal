import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { InvestmentIdeaPage } from "../../modules/investment-idea/InvestmentIdeaPage";
import { getViewEntity } from "../../utils/api/get-data";
import { PortalLayout } from "../../layouts/PortalLayout";
import { useRouter } from "next/router";
import { IdeaView } from "../../ts/types/entity/idea.types";

interface InvestmentIdea {
    ideaData: IdeaView;
}

const InvestmentIdea: NextPage<InvestmentIdea> = ({ ideaData }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [idea, setIdea] = useState<IdeaView>(ideaData);
    useEffect(() => {
        if (!ideaData) {
            router.push("/404");
        }
    }, [ideaData]);
    if (!ideaData) {
        return null;
    }
    return (
        <MainLayout title={`${t("Investment idea")} - ${idea.company.name}`}>
            <PortalLayout>
                <InvestmentIdeaPage ideaData={idea} onChange={setIdea} />
            </PortalLayout>
        </MainLayout>
    );
};
export default InvestmentIdea;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const ideaData = await getViewEntity("idea", context);
    return {
        props: {
            ideaData,
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
