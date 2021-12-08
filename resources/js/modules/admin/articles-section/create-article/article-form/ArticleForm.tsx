import React, { Fragment, useRef } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import { initialArticleForm } from "../../../../../ts/consts/forms/init-form";
import { Form } from "react-bootstrap";
import SunEditorCore from "suneditor/src/lib/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
    createArticle,
    updateArticle,
} from "../../../../../redux/actions/articleArtions";
import { Article } from "../../../../../ts/types/state/article.types";
interface ArticleForm {
    edit: Article;
}
export const ArticleForm: React.FC<ArticleForm> = ({ edit }) => {
    const { t } = useTranslation();

    const content = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor) => {
        content.current = sunEditor;
    };
    const dispatch = useDispatch();
    const handleSubmit = (form) => {
        const sendForm = {
            ...form,
            ...{ content: content.current.getContents(true) },
        };
        dispatch(edit ? updateArticle(sendForm) : createArticle(sendForm));
    };
    return (
        <Fragment>
            <Formik
                onSubmit={handleSubmit}
                initialValues={edit ?? initialArticleForm}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box my={1}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="text"
                                value={values.title}
                                name="title"
                                isValid={!errors.title}
                                placeholder={t("Enter title")}
                            />
                        </Box>
                        <Box my={1}>
                            <Form.Label>Content article</Form.Label>
                            <SunEditor
                                defaultValue={values.content}
                                getSunEditorInstance={getSunEditorInstance}
                                // lang={i18n.language}
                                setOptions={{
                                    buttonList: buttonList.complex,
                                }}
                                name="content"
                                height="400px"
                            />
                        </Box>
                        <Button type="submit">
                            {edit ? "Update article" : "Create article"}
                        </Button>
                    </form>
                )}
            </Formik>
        </Fragment>
    );
};
