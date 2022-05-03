import React, { useRef } from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IdeaPublishForm } from "../../../ts/types/forms/admin-idea-forms";
import { convertFormPublishIdea } from "../../../utils/convert-to-form";
import { DtoPersonalIdea } from "../../../ts/types/response/admin-response-personal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import { Grid, TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { Moment } from "moment";
import { getPossibleProfit, isShort } from "../../../utils/idea-publish";
import { SelectField } from "../../../../../components/ordinary/fields-form/select-field/SelectField";
import { TYPES_IDEA } from "../../../ts/consts/additional/publish-idea.consts";
import { CheckboxField } from "../../../../../components/ordinary/fields-form/checkbox-field/CheckboxField";
import { settingsSunEditor } from "../../../../../utils/other";
import SunEditorCore from "suneditor/src/lib/core";
import dynamic from "next/dynamic";
import { axios } from "../../../../../utils/axios";
import { useDispatch } from "react-redux";
import { alertSuccess } from "../../../../../redux/actions/alertActions";
import { useRouter } from "next/router";
import { Entity } from "../../../../../ts/enums/other.enums";

const SunEditor = dynamic(import("suneditor-react"), { ssr: false });

interface PublishFormIdea {
    idea: DtoPersonalIdea;
}
export const PublishFormIdea: React.FC<PublishFormIdea> = ({ idea }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const description = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor) => {
        description.current = sunEditor;
    };

    const handleSubmit = async (form: IdeaPublishForm) => {
        await axios
            .post(
                `${process.env.API_URL}/api/admin/${Entity.InvestmentIdea}/${idea.idea_id}`,
                {
                    ...form,
                    idea_id: idea.idea_id,
                    description: description.current.getContents(true),
                    is_short: isShort(form.price_buy, form.price_sell),
                }
            )
            .then((res) => {
                dispatch(alertSuccess("Idea published"));
                router.push(`/investment-idea/${idea.idea_id}`);
            });
    };

    return (
        <Formik
            initialValues={convertFormPublishIdea(idea)}
            onSubmit={handleSubmit}
            // validationSchema={ProfileSchema}
        >
            {({ values, handleChange, setFieldValue, handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Grid mb={3} spacing={2} direction="row" container>
                        <Grid item md={4}>
                            <TextField
                                disabled
                                fullWidth
                                label="Company"
                                value={idea.company.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="Price buy"
                                name="price_buy"
                                type="number"
                                value={values.price_buy}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="Price sell"
                                name="price_sell"
                                type="number"
                                value={values.price_sell}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid mb={3} spacing={2} direction="row" container>
                        <Grid item md={4}>
                            <SelectField
                                items={TYPES_IDEA.map((type) => {
                                    type.label = t(type.label);
                                    return type;
                                })}
                                value={Number(values.is_short)}
                                handleChange={handleChange}
                                label="Type idea"
                                name="is_short"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="Possible profit"
                                disabled
                                value={`${getPossibleProfit(
                                    values.price_buy,
                                    values.price_sell,
                                    values.is_short
                                )} %`}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label={t("Date end")}
                                    value={values.date_end}
                                    onChange={(val: Moment) => {
                                        setFieldValue(
                                            "date_end",
                                            val.format("YYYY/MM/DD")
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid spacing={2} direction="row" container>
                        <Grid item md={8}>
                            <SunEditor
                                defaultValue={""}
                                getSunEditorInstance={getSunEditorInstance}
                                setOptions={settingsSunEditor}
                                name="content"
                                height="400px"
                            />
                        </Grid>
                        <Grid item md={4}>
                            <CheckboxField
                                handleChange={handleChange}
                                value={values.send_email}
                                name="send_email"
                                label={t("Notify subscribers by email")}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit">{t("Publish idea")}</Button>
                </Form>
            )}
        </Formik>
    );
};
