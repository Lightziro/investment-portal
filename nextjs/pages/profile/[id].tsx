import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ProfilePage } from "../../modules/profile/pages/ProfilePage";
import { useTranslation } from "react-i18next";
import { getViewEntity } from "../../utils/api/get-data";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setViewEntity } from "../../redux/actions/viewActions";
import { PortalLayout } from "../../layouts/PortalLayout";
import { ProfileView } from "../../redux/ts/types/view/view-store.types";
interface Profile {
    profile: ProfileView;
}
const Profile: NextPage<Profile> = ({ profile }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setViewEntity(profile, "profile"));
    }, []);
    return (
        <MainLayout title={`${t("Profile")} ${profile.full_name}`}>
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
