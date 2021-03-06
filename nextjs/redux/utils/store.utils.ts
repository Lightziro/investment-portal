import { axios } from "../../utils/axios";
import { AxiosRequestConfig } from "axios";
import { initStore } from "../../ts/types/redux/store.init";

export const getInitUser = async function (req: any) {
    const config: AxiosRequestConfig = { headers: req.headers };

    return await axios
        .get(`${process.env.API_URL_DOCKER}/get-user`, config)
        .then((res) => res.data)
        .catch((e) => initStore.user);
};
