import { UserStore } from "../../ts/types/redux/store.types";

export const setNoticeView = (
    state: UserStore,
    updateId: number
): UserStore => {
    return {
        ...state,
        notices: state.notices.map((notice) => {
            if (notice.notice_id === updateId && !notice.viewed) {
                notice.viewed = true;
            }
            return notice;
        }),
    };
};
