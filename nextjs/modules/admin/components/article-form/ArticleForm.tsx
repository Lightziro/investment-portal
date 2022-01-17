import React, { useRef } from "react";
import { Formik, FormikProps } from "formik";
import { FormArticle } from "../../../../ts/types/forms/form.types";
import { Button, Form, Row } from "react-bootstrap";
import SunEditorCore from "suneditor/src/lib/core";
import { initialArticleForm } from "../../../../ts/init/entity/article.init";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { settingsSunEditor } from "../../../../utils/other";
interface ArticleForm {
    article?: any;
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
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
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
                        <Form.Label>Content article</Form.Label>
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
                            value={values.sendNotice}
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
                    {/*<Row className="mb-3">*/}
                    {/*    <Form.Group as={Col}>*/}
                    {/*        <Form.Label>{t("Role")}</Form.Label>*/}
                    {/*        <Form.Select*/}
                    {/*            name="role"*/}
                    {/*            onChange={handleChange}*/}
                    {/*            value={values.role}*/}
                    {/*        >*/}
                    {/*            {roles.map((item) => (*/}
                    {/*                <option*/}
                    {/*                    key={item.roleId}*/}
                    {/*                    value={item.roleId}*/}
                    {/*                >*/}
                    {/*                    {item.name}*/}
                    {/*                </option>*/}
                    {/*            ))}*/}
                    {/*        </Form.Select>*/}
                    {/*    </Form.Group>*/}
                    {/*    <Form.Group as={Col}>*/}
                    {/*        <Form.Label>{t("Country")}</Form.Label>*/}
                    {/*        <Form.Select*/}
                    {/*            name="country"*/}
                    {/*            onChange={handleChange}*/}
                    {/*            value={values.country}*/}
                    {/*        >*/}
                    {/*            {countries.map((item) => (*/}
                    {/*                <option*/}
                    {/*                    key={item.country_id}*/}
                    {/*                    value={item.country_id}*/}
                    {/*                >*/}
                    {/*                    {item.name}*/}
                    {/*                </option>*/}
                    {/*            ))}*/}
                    {/*        </Form.Select>*/}
                    {/*    </Form.Group>*/}
                    {/*    <Form.Group as={Col}>*/}
                    {/*        <Form.Label>{t("Sex")}</Form.Label>*/}
                    {/*        <Form.Select*/}
                    {/*            name="sex"*/}
                    {/*            value={values.sex}*/}
                    {/*            onChange={handleChange}*/}
                    {/*        >*/}
                    {/*            {sexList.map((item) => (*/}
                    {/*                <option key={item.value} value={item.value}>*/}
                    {/*                    {t(item.label)}*/}
                    {/*                </option>*/}
                    {/*            ))}*/}
                    {/*        </Form.Select>*/}
                    {/*    </Form.Group>*/}
                    {/*</Row>*/}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            )}
        </Formik>
    );
};
