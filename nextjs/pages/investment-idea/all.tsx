import React, { useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { axios } from "../../utils/axios";
import { IdeaModel } from "../../ts/types/entity/idea.types";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { AllIdeasPage } from "../../modules/portal/pages/AllIdeasPage";
import { useTranslation } from "react-i18next";

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

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const config: any = { headers: context.req.headers };
    const ideas = await axios(`${process.env.API_URL_DOCKER}/api/idea/all`)
        .then((res) => res.data)
        .catch((e) => []);
    return {
        props: {
            ideas,
        },
    };
};
