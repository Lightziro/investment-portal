require("dotenv").config();

/** @type {import('next').NextConfig} */
module.exports = {
    env: {
        API_URL: process.env.API_URL,
        API_URL_DOCKER: process.env.API_URL_DOCKER,
        TYPE_SERVER: process.env.TYPE_SERVER,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["localhost"],
    },
    transpilePackages: [
        "antd",
        "@ant-design/nextjs-registry",
        "rc-util",
        "rc-pagination",
        "rc-picker",
        "@ant-design/colors",
        "@ant-design/icons",
        "@ant-design/icons-svg",
        "rc-tree",
        "rc-table",
    ],
};
