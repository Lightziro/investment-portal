import { UserStore } from "../../ts/types/redux/store.types";
import { changeViewNotice } from "../../utils/user/user-actions";

export const setNoticeView = (
    state: UserStore,
    noticeId: number
): UserStore => {
    return {
        ...state,
        notices: changeViewNotice(state.notices, noticeId),
    };
};
