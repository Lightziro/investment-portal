import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { axios } from "../axios";
import { Entity } from "../../ts/enums/other.enums";

export const getListNews = async () => {
    const response = await fetch(
        `${process.env.API_URL_DOCKER}/api/investment-data/news`
    );
    return await response.json();
};
export const getBasePortal = async () => {
    const response = await fetch(
        `${process.env.API_URL_DOCKER}/api/investment-data/get`
    );
    return await response.json();
};

export const getViewEntity = async (
    entityName,
    ctx: GetServerSidePropsContext
) => {
    const config: any = { headers: ctx.req.headers };
    return await axios
        .get(
            `${process.env.API_URL_DOCKER}/api/${entityName}/${ctx.params.id}`,
            config
        )
        .then((res) => res.data)
        .catch((e) => null);
};
// TODO переписать на тип сущности
export const getRoles = async () =>
    await axios
        .get(`${process.env.API_URL}/api/other/roles`)
        .then((res) => res.data)
        .catch(() => []);
export const getCountries = async () =>
    await axios
        .get(`${process.env.API_URL}/api/other/countries`)
        .then((res) => res.data)
        .catch(() => []);

export const getEntityAdmin = async (
    id: number,
    entity: Entity,
    ctx: GetServerSidePropsContext
) => {
    const config: any = { headers: ctx.req.headers };
    return await axios
        .get(`${process.env.API_URL_DOCKER}/api/admin/${entity}/${id}`, config)
        .then((res) => res.data)
        .catch((e) => console.log(e));
};
export const getSearchData = async (value: string) =>
    await axios
        .get(`${process.env.API_URL}/api/search/${value}`)
        .then((res) => res.data)
        .catch((e) => []);
export const getCompanyStats = async (companyId: number) =>
    await axios
        .get(`${process.env.API_URL}/api/company/${companyId}/stats`)
        .then((res) => res.data)
        .catch((e) => []);

export const sortBy = async (entity: Entity, field) =>
    await axios
        .get(`${process.env.API_URL}/api/${entity}/all/${field}`)
        .then((res) => res.data)
        .catch((e) => []);

export const getAll = async (entity: Entity) =>
    await axios
        .get(`${process.env.API_URL_DOCKER}/api/${entity}/all`)
        .then((res) => res.data)
        .catch((e) => []);
