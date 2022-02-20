import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ProfilePage } from "../../modules/profile/pages/ProfilePage";
import { useTranslation } from "react-i18next";
import { getViewEntity } from "../../utils/api/get-data";
import { useState } from "react";
import { PortalLayout } from "../../layouts/PortalLayout";
import { ProfileUser } from "../../ts/types/other/view.types";
import { ProfileContext } from "../../modules/profile/contexts/ProfileContext";

interface Profile {
    profileEntity: ProfileUser;
}

const Profile: NextPage<Profile> = ({ profileEntity }) => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState<ProfileUser>(profileEntity);
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
    const profileEntity = await getViewEntity("profile", ctx);
    return {
        props: { profileEntity },
    };
};
