import Axios from "axios";

export const axios = Axios.create({
    withCredentials: true,
});

axios.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("tokenAuthHub");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const instanceAxios = (req: Record<any, any>) => {
    let sessionCookieMatches;

    if (req.headers.cookie) {
        sessionCookieMatches = req.headers.cookie.match(/session+=[^;]*/);
    }

    let cookie = "";

    if (sessionCookieMatches) {
        cookie = sessionCookieMatches[0];
    }

    return Axios.create({
        baseURL: process.env.API_URL_DOCKER,
        headers: {
            Cookie: cookie,
        },
    });
};
