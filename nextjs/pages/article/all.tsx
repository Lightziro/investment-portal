import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout/PortalLayout";
import { useTranslation } from "react-i18next";
import { AllArticlePage } from "../../modules/portal/pages/AllArticlePage";
import { useState } from "react";
import { getAll } from "../../utils/api/get-data";
import { Entity } from "../../ts/enums/other.enums";
import { ArticleModel } from "../../ts/types/entity/article.types";

interface AllArticle {
    articles: ArticleModel[];
}

const AllArticle: NextPage<AllArticle> = ({ articles }) => {
    const { t } = useTranslation();
    const [items, setItems] = useState<ArticleModel[]>(articles);

    return (
        <MainLayout title={t("Articles")}>
            <PortalLayout>
                <AllArticlePage setArticle={setItems} items={items} />
            </PortalLayout>
        </MainLayout>
    );
};
export default AllArticle;

export const getServerSideProps = async () => {
    const articles = await getAll(Entity.Article);
    return {
        props: {
            articles,
        },
    };
};
