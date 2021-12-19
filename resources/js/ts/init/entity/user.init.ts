import { ProfileView } from "../../types/redux/store.types";

export const initialProfile: ProfileView = {
    userId: null,
    roleName: null,
    name: {
        fullName: null,
        firstName: null,
        lastName: null,
    },
    allComments: null,
    country: null,
    sex: null,
    avatar: null,
    dateCreate: null,
};
