import React, { useRef } from "react";
import { useFormik } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import SunEditorCore from "suneditor/src/lib/core";
import { initialArticleForm } from "../../../../ts/init/entity/article.init";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { getPhoto, settingsSunEditor } from "../../../../utils/other";
import { ArticleModel } from "../../../../ts/types/entity/article.types";
import { ArticleSchema } from "../../../../ts/validation/article.validation";

interface ArticleForm {
    article?: ArticleModel;
    callback: (form) => void;
    buttonText: string;
}

const SunEditor = dynamic(import("suneditor-react"), { ssr: false });
export const ArticleForm: React.FC<ArticleForm> = ({
    article,
    callback,
    buttonText,
}) => {
    const { t } = useTranslation();
    const content = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor) => {
        content.current = sunEditor;
    };

    const formik = useFormik({
        initialValues: article
            ? { ...article, sendNotice: false }
            : initialArticleForm,
        validationSchema: ArticleSchema,
        onSubmit: (form) =>
            callback({
                ...form,
                ...{ content: content.current.getContents(true) },
            }),
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>{t("Title")}</Form.Label>
                <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    name="title"
                    isInvalid={!!formik.errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {t(formik.errors.title)}
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Form.Label>{t("Content")}</Form.Label>
                <SunEditor
                    defaultValue={formik.values.content}
                    getSunEditorInstance={getSunEditorInstance}
                    setOptions={settingsSunEditor}
                    name="content"
                    height="400px"
                />
            </Row>
            <Form.Group className="mt-3">
                <Form.Check
                    value={Number(formik.values.sendNotice)}
                    name="sendNotice"
                    onChange={formik.handleChange}
                    type="checkbox"
                    label={
                        article
                            ? t("Send notice to users about update article")
                            : t("Send notice to subscribers email")
                    }
                />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>{t("Preview")}</Form.Label>
                <Form.Control
                    type="file"
                    name="preview_path"
                    onChange={(e) =>
                        formik.setFieldValue(
                            "preview_path",
                            (e.target as HTMLInputElement).files[0]
                        )
                    }
                    size="sm"
                />
                {formik.values.preview_path && (
                    <img
                        width="194"
                        src={getPhoto(formik.values.preview_path)}
                    />
                )}
            </Form.Group>
            <Button variant="primary" type="submit">
                {t(buttonText)}
            </Button>
        </form>
    );
};
