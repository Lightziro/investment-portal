import React, { useRef } from "react";
import { Formik, FormikProps } from "formik";
import { FormArticle } from "../../../../ts/types/forms/form.types";
import { Button, Form, Row } from "react-bootstrap";
import SunEditorCore from "suneditor/src/lib/core";
import { initialArticleForm } from "../../../../ts/init/entity/article.init";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { getPhoto, settingsSunEditor } from "../../../../utils/other";
import { DtoEditArticle } from "../../ts/types/response/admin-response-personal";
interface ArticleForm {
    article?: DtoEditArticle;
    callback: (form) => void;
}
const SunEditor = dynamic(import("suneditor-react"), { ssr: false });
export const ArticleForm: React.FC<ArticleForm> = ({ article, callback }) => {
    const { t } = useTranslation();
    const content = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor) => {
        content.current = sunEditor;
    };
    return (
        <Formik
            initialValues={article ? article : initialArticleForm}
            onSubmit={(form) =>
                callback({
                    ...form,
                    ...{ content: content.current.getContents(true) },
                })
            }
        >
            {({
                values,
                handleChange,
                setFieldValue,
                handleSubmit,
            }: FormikProps<FormArticle>) => (
                <form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("Title")}</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            placeholder="Enter title article"
                        />
                    </Form.Group>
                    <Row>
                        <Form.Label>{t("Content")}</Form.Label>
                        <SunEditor
                            defaultValue={values.content}
                            getSunEditorInstance={getSunEditorInstance}
                            setOptions={settingsSunEditor}
                            name="content"
                            height="400px"
                        />
                    </Row>
                    <Form.Group className="mt-3">
                        <Form.Check
                            value={Number(values.sendNotice)}
                            name="sendNotice"
                            onChange={handleChange}
                            type="checkbox"
                            label={
                                article
                                    ? t(
                                          "Send notice to users about update article"
                                      )
                                    : t("Send notice to subscribers email")
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>{t("Preview")}</Form.Label>
                        <Form.Control
                            type="file"
                            name="preview"
                            onChange={(e) =>
                                setFieldValue(
                                    "preview",
                                    (e.target as HTMLInputElement).files[0]
                                )
                            }
                            // value={values.preview}
                            size="sm"
                        />
                        {values.preview && (
                            <img width="194" src={getPhoto(values.preview)} />
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
};