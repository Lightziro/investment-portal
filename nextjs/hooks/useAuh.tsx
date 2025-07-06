import { useRootSelector } from "./useTypeSelector";
import { useEffect } from "react";
import { getUser } from "../redux/actions/userActions";
import { init, initData } from "@telegram-apps/sdk";
import { useDispatch } from "react-redux";

const useAuh = () => {
    const { fetch } = useRootSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!fetch) {
            init();
            initData.restore();
            const raw = initData.raw();
            dispatch(getUser(raw));
        }
    }, []);
    return {};
};
export default useAuh;
