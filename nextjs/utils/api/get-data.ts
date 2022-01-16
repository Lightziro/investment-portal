import { News } from "../../ts/types/entity/stock-market.types";
import { DtoPortal } from "../../ts/types/response/response.types";
import { GetServerSidePropsContext } from "next";
import { AxiosRequestConfig } from "axios";
import { axios } from "../axios";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";
import { Role } from "../../ts/types/entity/user.types";

export const getListNews = async (): News[] => {
    const response = await fetch(
        `${process.env.API_URL_DOCKER}/api/investment-data/news`
    );
    return await response.json();
};
export const getBasePortal = async (): DtoPortal => {
    const response = await fetch(
        `${process.env.API_URL_DOCKER}/api/investment-data/get`
    );
    return await response.json();
};
export const getViewEntity = async (
    entityName,
    ctx: GetServerSidePropsContext
) => {
    const config: AxiosRequestConfig = { headers: ctx.req.headers };
    return await axios
        .get(
            `${process.env.API_URL_DOCKER}/api/${entityName}/get/${ctx.query.id}`,
            config
        )
        .then((res) => res.data)
        .catch((e) => initialViewStore[entityName]);
};
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
