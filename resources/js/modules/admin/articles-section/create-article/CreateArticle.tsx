import React, { Fragment } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "suneditor/dist/css/suneditor.min.css";
import { ArticleForm } from "./article-form/ArticleForm";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../../../nextjs/ts/types/redux/store.types";
import { setArticleDialog } from "../../../../../../nextjs/redux/actions/adminActions";
export const CreateArticle: React.FC = () => {
    const { dialog, edit } = useSelector(
        (state: StoreData) => state.admin.articles
    );
    const dispatch = useDispatch();
    return (
        <Fragment>
            {dialog && (
                <Dialog open={dialog}>
                    <DialogTitle>
                        Create
                        <IconButton
                            className="close-button"
                            onClick={() => dispatch(setArticleDialog(false))}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <ArticleForm edit={edit} />
                    </DialogContent>
                </Dialog>
            )}
        </Fragment>
    );
};
