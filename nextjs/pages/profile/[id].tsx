import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { getViewEntity } from "../../redux/utils/store.utils";
import { ProfilePage } from "../../modules/profile/pages/ProfilePage";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { useTranslation } from "react-i18next";

const Profile: NextPage = () => {
    const { t } = useTranslation();

    const profile = useRootSelector((store) => store.view.profile);
    console.log("PROFILE", profile);
    return (
        <MainLayout title={`${t("Profile")} ${profile.fullName}`}>
            <ProfilePage profile={profile} />
        </MainLayout>
    );
};
export default Profile;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const profile = await getViewEntity("profile", ctx);
    process.initialState.view = { profile };
    return {
        props: { profile },
    };
};
