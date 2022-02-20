import { NextPage } from "next";
import { useRouter } from "next/router";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getSearchData } from "../../utils/api/get-data";
import { Tabs } from "antd";
import { Container, Paper } from "@mui/material";
import { SearchOption } from "../../ts/types/other/other.types";
import { TabEntity } from "../../modules/search/components/tab-entity/TabEntity";

const { TabPane } = Tabs;
const Search: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [searchData, setSearchData] = useState<SearchOption[]>([]);
    const value = router.query.value;
    useEffect(() => {
        if (value) {
            fetchSearchData();
        }
    }, [value]);
    const fetchSearchData = async () => {
        const data = await getSearchData(String(value));
        setSearchData(data);
    };
    return (
        <MainLayout title={t("Search")}>
            <PortalLayout>
                <Container maxWidth="sm">
                    <Paper sx={{ px: 2, py: 1 }}>
                        <Tabs defaultActiveKey="1" centered>
                            {searchData.map((section, tabNumber) => (
                                <TabPane
                                    tab={t(section.entity)}
                                    key={String(tabNumber + 1)}
                                >
                                    <TabEntity entityData={section} />
                                </TabPane>
                            ))}
                        </Tabs>
                    </Paper>
                </Container>
            </PortalLayout>
        </MainLayout>
    );
};
export default Search;
