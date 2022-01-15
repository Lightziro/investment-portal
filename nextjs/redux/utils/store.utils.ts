import { axios } from "../../utils/axios";
import { AxiosRequestConfig } from "axios";
import {
    MainStore,
    StoreData,
    UserStore,
} from "../../ts/types/redux/store.types";
import { initStore } from "../../ts/types/redux/store.init";
import { News } from "../../ts/types/entity/stock-market.types";
import { GetServerSidePropsContext } from "next";
import { initialViewStore } from "../../ts/init/redux/reducer.initial";

export const getInitUser = async function (req: any): UserStore {
    const config: AxiosRequestConfig = { headers: req.headers };

    const user = await axios
        .get(`${process.env.API_URL_DOCKER}/get-user`, config)
        .then((res) => res.data)
        .catch((e) => initStore.user);
    return user;
    // const initData = await axios
    //     .get(`${process.env.API_URL_DOCKER}/api/init/portal-data`, config)
    //     .then((res) => res.data)
    //     .catch((e) => {
    //         console.log("ERROR GET BASE DATA", e);
    //         return initStore.main;
    //     });
    return user;
};
export const getInitPortal = async () => {
    const initData = await axios
        .get(`${process.env.API_URL_DOCKER}/api/init/portal-data`)
        .then((res) => res.data)
        .catch((e) => {
            console.log("ERROR GET BASE DATA", e);
            return initStore.main;
        });
    return initData;
};
