import { MainStore } from "../ts/types/main/main-store.types";
import { UserStore } from "../../ts/types/redux/store.types";

export const setNoticeView = (
    state: UserStore,
    updateId: number
): UserStore => {
    return {
        ...state,
        notices: state.notices.map((notice) => {
            if (notice.id === updateId && !notice.viewed) {
                notice.viewed = true;
            }
            return notice;
        }),
    };
};
