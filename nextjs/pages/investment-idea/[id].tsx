import React from "react";
import { NextPage, NextPageContext } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import getTitleIdea from "../../modules/investment-idea/utils/get-title-idea";
import { InvestmentIdeaPage } from "../../modules/investment-idea/InvestmentIdeaPage";
import { getViewEntity } from "../../utils/api/get-data";
import { InvestmentIdeaView } from "../../ts/types/redux/store.types";
interface InvestmentIdea {
    idea: InvestmentIdeaView;
}
const InvestmentIdea: NextPage<InvestmentIdea> = ({ idea }) => {
    const { t } = useTranslation();
    return (
        <MainLayout
            title={`${t("Investment idea")} - ${getTitleIdea(
                idea.companyInfo
            )}`}
        >
            <InvestmentIdeaPage ideaData={idea} />
        </MainLayout>
    );
};
export default InvestmentIdea;
export const getServerSideProps = async (ctx: NextPageContext) => {
    const idea = await getViewEntity("idea", ctx);
    return {
        props: { idea },
    };
};
