import React from "react";
import { Avatar } from "@mui/material";
import Link from "next/link";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Comment } from "../../../../ts/types/other/view.types";
// import { Comment as CommentComponent } from "antd";
interface CommentItem {
    comment: Comment;
}
export const CommentItem: React.FC<CommentItem> = ({ comment }) => {
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    return "";
    // return (
    // <CommentComponent
    //     author={
    //         <Link href={`/profile/[id]`} as={`/profile/${comment.user_id}`}>
    //             {comment.user.full_name}
    //         </Link>
    //     }
    //     avatar={
    //         <Link href={`/profile/[id]`} as={`/profile/${comment.user_id}`}>
    //             <Avatar
    //                 src={`${process.env.API_URL}/storage/${comment.user.avatar_path}`}
    //             />
    //         </Link>
    //     }
    //     content={comment.comment}
    //     datetime={moment(comment.created_at).fromNow()}
    // />
    // );
};
