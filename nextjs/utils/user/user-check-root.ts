import { UserModel } from "../../ts/types/entity/user.types";

export const checkNoUserAuth = (fetch: boolean, data: any) => fetch && !data;
