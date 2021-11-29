import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "suneditor/dist/css/suneditor.min.css";
import { CreateArticleForm } from "./create-article-form/CreateArticleForm"; // Import Sun Editor's CSS File
interface CreateArticle {
    create: boolean;
    onClose: () => void;
}
export const CreateArticle: React.FC<CreateArticle> = ({ create, onClose }) => {
    return (
        <Dialog open={create} onClose={onClose}>
            <DialogTitle>
                Create
                <IconButton className="close-button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <CreateArticleForm />
            </DialogContent>
        </Dialog>
    );
};
