import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    clearView,
    fetchInvestmentIdea,
} from "../../redux/actions/mainActions";
import { NextPage, NextPageContext } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useRootSelector } from "../../hooks/useTypeSelector";
import getTitleIdea from "../../modules/investment-idea/utils/get-title-idea";
import { InvestmentIdeaPage } from "../../modules/investment-idea/InvestmentIdeaPage";
import { getViewEntity } from "../../redux/utils/store.utils";
import { useRouter } from "next/router";

const InvestmentIdea: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const idea = useRootSelector((store) => store.view.idea);
    const { t } = useTranslation();
    useEffect(() => {
        if (Number(id) !== idea.ideaId) {
            dispatch(clearView("idea"));
            dispatch(fetchInvestmentIdea(parseInt(id)));
        }
    }, []);
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
    console.log("IDEA START", idea);
    process.initialState.view = { idea };
    return {
        props: { idea },
    };
};
