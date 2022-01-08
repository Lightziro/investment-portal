import { axios } from "../../utils/axios";

const getInitialState = async function (req: any) {
    let sessionCookieMatches;

    if (req.headers.cookie) {
        sessionCookieMatches = req.headers.cookie.match(/session=[^;]+/);
    }

    let cookie = "";

    if (sessionCookieMatches) {
        cookie = sessionCookieMatches[0];
    }
    return await axios
        .get(`${process.env.API_URL_DOCKER}/api/init/portal-data`, {
            headers: {
                Cookie: cookie,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.log("ERROR", e);
            return null;
        });
};

export default getInitialState;
