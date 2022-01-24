import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ProfilePage } from "../../modules/profile/pages/ProfilePage";
import { useTranslation } from "react-i18next";
import { getViewEntity } from "../../utils/api/get-data";
import { ProfileView } from "../../ts/types/redux/store.types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setViewEntity } from "../../redux/actions/viewActions";
import { useRouter } from "next/router";
import { PortalLayout } from "../../layouts/PortalLayout";
interface Profile {
    profile: ProfileView;
}
const Profile: NextPage<Profile> = ({ profile }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setViewEntity(profile, "profile"));
    }, []);
    return (
        <MainLayout title={`${t("Profile")} ${profile.fullName}`}>
            <PortalLayout>
                <ProfilePage profile={profile} />
            </PortalLayout>
        </MainLayout>
    );
};
export default Profile;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const profile = await getViewEntity("profile", ctx);
    return {
        props: { profile },
    };
};
