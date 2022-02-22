import React from "react";
import { ProfileUser } from "../../../ts/types/other/view.types";

const initContext: ProfileContext = {
    profile: null,
    setProfile: null,
};

export const ProfileContext: React.Context<ProfileContext> =
    React.createContext(initContext);

export interface ProfileContext {
    setProfile: (value) => void;
    profile: ProfileUser;
}
