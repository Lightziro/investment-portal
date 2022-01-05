import { MainStore } from "../../ts/types/redux/store.types";

export const setNoticeView = (
    state: MainStore,
    updateId: number
): MainStore => {
    return {
        ...state,
        user: {
            ...state.user,
            notices: state.user.notices.map((notice) => {
                if (notice.id === updateId && !notice.viewed) {
                    notice.viewed = true;
                }
                return notice;
            }),
        },
    };
};
