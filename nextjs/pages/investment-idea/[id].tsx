import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { InvestmentIdeaPage } from "../../modules/investment-idea/InvestmentIdeaPage";
import { getViewEntity } from "../../utils/api/get-data";
import { PortalLayout } from "../../layouts/PortalLayout/PortalLayout";
import { useRouter } from "next/router";
import { IdeaView } from "../../ts/types/entity/idea.types";
import { Entity } from "../../ts/enums/other.enums";

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
    const ideaData = await getViewEntity(Entity.InvestmentIdea, context);
    return {
        props: {
            ideaData,
        },
    };
};
