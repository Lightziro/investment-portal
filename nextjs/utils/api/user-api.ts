import { axios } from "../axios";

export const requestViewNotice = async (id: number) =>
    await axios.put(`${process.env.API_URL}/api/user/notice/view`, { id });
