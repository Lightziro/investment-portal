require("dotenv").config();

module.exports = {
    env: {
        API_URL: process.env.API_URL,
        API_URL_DOCKER: process.env.API_URL_DOCKER,
        TYPE_SERVER: process.env.TYPE_SERVER,
    },
    images: {
        domains: ["localhost"],
    },
};
