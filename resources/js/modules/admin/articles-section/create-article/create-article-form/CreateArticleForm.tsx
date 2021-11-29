import React, { Fragment, useRef } from "react";
import SunEditor from "suneditor-react";
import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import { initialArticleForm } from "../../../../../ts/consts/forms/init-form";
import { Form } from "react-bootstrap";
import SunEditorCore from "suneditor/src/lib/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { createArticle } from "../../../../../redux/actions/articleArtions";

export const CreateArticleForm: React.FC = () => {
    const { t, i18n } = useTranslation();

    const content = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor) => {
        content.current = sunEditor;
    };
    const dispatch = useDispatch();
    const handleSubmit = (form) => {
        dispatch(
            createArticle({
                ...form,
                ...{ content: content.current.getContents(true) },
            })
        );
    };
    return (
        <Fragment>
            <Formik onSubmit={handleSubmit} initialValues={initialArticleForm}>
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
                            <Form.Label>Content acticle</Form.Label>
                            <SunEditor
                                getSunEditorInstance={getSunEditorInstance}
                                // lang={i18n.language}
                                name="content"
                                height="400px"
                            />
                        </Box>
                        <Button type="submit">Load</Button>
                    </form>
                )}
            </Formik>
        </Fragment>
    );
};
