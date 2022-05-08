import { UserData, UserStore } from "../../ts/types/redux/store.types";
import { changeViewNotice } from "../../utils/user/user-actions";

export const setNoticeView = (
    state: UserStore,
    noticeId: number
): UserStore => {
    return {
        ...state,
        data: {
            ...state.data,
            notices: changeViewNotice(state.data.notices, noticeId),
        },
    };
};
