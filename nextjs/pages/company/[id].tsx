import React, {useEffect, useState} from "react";
import {GetServerSidePropsContext, NextPage} from "next";
import {getViewEntity} from "../../utils/api/get-data";
import {useTranslation} from "react-i18next";
import {MainLayout} from "../../layouts/MainLayout";
import {PortalLayout} from "../../layouts/PortalLayout";
import {CompanyModel} from "../../ts/types/entity/other.types";
import {useRouter} from "next/router";
import {Container} from "@mui/material";
import {CompanyPage} from "../../modules/company/pages/CompanyPage";

interface Company {
    companyData: CompanyModel;
}

const Company: NextPage<Company> = ({companyData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    const [company, setCompany] = useState<CompanyModel>(companyData);
    useEffect(() => {
        if (!companyData) {
            router.push("/404");
        }
    }, []);
    if (!companyData) {
        return null;
    }
    return (
        <MainLayout title={`${t("Company")} - ${company.name}`}>
            <PortalLayout>
                <CompanyPage company={company}/>
            </PortalLayout>
        </MainLayout>
    );
};
export default Company;
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const companyData = await getViewEntity("company", context);
    return {
        props: {
            companyData,
        },
    };
};
