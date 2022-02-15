import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { axios } from "../axios";
import { AdminEntity } from "../../redux/ts/enums/admin/admin.enum";

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

export const getQuotePortal = async () => {
    const response = await fetch(
        `${process.env.API_URL_DOCKER}/api/other/quotes`
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
        .catch((e) => {
            console.log(e);
            return null;
        });
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
    entity: AdminEntity,
    ctx: GetServerSidePropsContext
) => {
    const config: any = { headers: ctx.req.headers };
    return await axios
        .get(
            `${process.env.API_URL_DOCKER}/api/admin/${entity}/get-item/${id}`,
            config
        )
        .then((res) => res.data)
        .catch(() => null);
};
