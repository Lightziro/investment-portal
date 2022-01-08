import Axios from "axios";

export const axios = Axios.create({
    withCredentials: true,
});

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
