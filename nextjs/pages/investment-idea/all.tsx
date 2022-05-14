import React, { useState } from "react";
import { NextPage } from "next";
import { IdeaModel } from "../../ts/types/entity/idea.types";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { AllIdeasPage } from "../../modules/portal/pages/AllIdeasPage";
import { useTranslation } from "react-i18next";
import { getAll } from "../../utils/api/get-data";
import { Entity } from "../../ts/enums/other.enums";

interface AllIdeas {
    ideas: IdeaModel[];
}

const AllIdeas: NextPage<AllIdeas> = ({ ideas }) => {
    const { t } = useTranslation();
    const [items, setItems] = useState<IdeaModel[]>(ideas);

    return (
        <MainLayout title={t("Investment ideas")}>
            <PortalLayout>
                <AllIdeasPage ideas={items} setIdeas={setItems} />
            </PortalLayout>
        </MainLayout>
    );
};
export default AllIdeas;

export const getServerSideProps = async () => {
    const ideas = await getAll(Entity.InvestmentIdea);
    return {
        props: {
            ideas,
        },
    };
};
