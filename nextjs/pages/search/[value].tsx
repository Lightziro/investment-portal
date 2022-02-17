import { NextPage } from "next";
import { useRouter } from "next/router";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { useTranslation } from "react-i18next";

const Search: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    console.log(router.query.value);
    return (
        <MainLayout title={t("Search")}>
            <PortalLayout>
                <span>Testick</span>
            </PortalLayout>
        </MainLayout>
    );
};
export default Search;
