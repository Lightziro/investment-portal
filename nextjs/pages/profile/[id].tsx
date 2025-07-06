import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ProfilePage } from "../../modules/profile/pages/ProfilePage";
import { useTranslation } from "react-i18next";
import { getViewEntity } from "../../utils/api/get-data";
import { useEffect, useState } from "react";
import { PortalLayout } from "../../layouts/PortalLayout/PortalLayout";
import { ProfileUser } from "../../ts/types/other/view.types";
import { ProfileContext } from "../../modules/profile/contexts/ProfileContext";
import { Entity } from "../../ts/enums/other.enums";
import { useRouter } from "next/router";

interface Profile {
    profileEntity: ProfileUser;
}

const Profile: NextPage<Profile> = ({ profileEntity }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileUser>(profileEntity);

    useEffect(() => {
        if (!profile) {
            router.push("/404");
        }
    }, [profile]);

    if (!profile) {
        return null;
    }

    return (
        <MainLayout title={`${t("Profile")} ${profile.full_name}`}>
            <PortalLayout>
                <ProfileContext.Provider value={{ setProfile, profile }}>
                    <ProfilePage />
                </ProfileContext.Provider>
            </PortalLayout>
        </MainLayout>
    );
};
export default Profile;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const profileEntity = await getViewEntity(Entity.Profile, ctx);
    return {
        props: { profileEntity },
    };
};
