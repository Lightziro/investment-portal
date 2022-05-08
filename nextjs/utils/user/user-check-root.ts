import { UserData } from "../../ts/types/redux/store.types";

export const checkNoUserAuth = (fetch: boolean, data: any) => fetch && !data;

export const checkNoRootAdmin = (fetch: boolean, data: UserData) =>
    fetch && ((data && data.role !== "admin") || !data);
