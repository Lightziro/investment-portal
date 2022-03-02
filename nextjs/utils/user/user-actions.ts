import { UserNoticeModel } from "../../ts/types/entity/user.types";

export const changeViewNotice = (
    notices: UserNoticeModel[],
    noticeId: number
) =>
    notices.map((notice) => {
        if (notice.notice_id === noticeId && !notice.viewed) {
            notice.viewed = true;
        }
        return notice;
    });
