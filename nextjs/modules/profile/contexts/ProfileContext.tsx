import React from "react";
import { ProfileUser } from "../../../ts/types/other/view.types";
export const ProfileContext: React.Context<ProfileContext> =
    React.createContext();

export interface ProfileContext {
    setProfile: (value) => void;
    profile: ProfileUser;
}
