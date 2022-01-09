import { axios } from "../../utils/axios";
import { AxiosRequestConfig } from "axios";
import { StoreData } from "../../ts/types/redux/store.types";
import { initStore } from "../../ts/types/redux/store.init";

export const getInitialState = async function (req: any) {
    const config: AxiosRequestConfig = { headers: req.headers };
    const user = await axios
        .get(`${process.env.API_URL_DOCKER}/get-user`, config)
        .then((res) => res.data)
        .catch((e) => {
            console.log("ERROR GET USER", e);
            return initStore.user;
        });
    const initData = await axios
        .get(`${process.env.API_URL_DOCKER}/api/init/portal-data`, config)
        .then((res) => res.data)
        .catch((e) => {
            console.log("ERROR GET BASE DATA", e);
            return initStore.main;
        });
    return <StoreData>{ ...initStore, user: user, main: initData };
};

export const getListNews = async (req: any) => {
    return await axios
        .get(`${process.env.API_URL_DOCKER}/api/investment-data/news`)
        .then((res) => res.data)
        .catch((e) => {
            console.log("ERROR NEWS USER", e);
            return initStore.main.news;
        });
};
