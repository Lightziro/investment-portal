import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IdeaPublishForm } from "../../../ts/types/forms/admin-idea-forms";
import { convertFormPublishIdea } from "../../../utils/convert-to-form";
import { DtoPersonalIdea } from "../../../ts/types/response/admin-response-personal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import { Grid, TextField, Typography } from "@mui/material";
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
import {
    alertError,
    alertSuccess,
} from "../../../../../redux/actions/alertActions";
import { useRouter } from "next/router";
import { Entity } from "../../../../../ts/enums/other.enums";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";
import ManuallyPublish from "../manually-publish/ManuallyPublish";
import { ErrorsResponse } from "../../../../../ts/enums/errors.enums";

const SunEditor = dynamic(import("suneditor-react"), { ssr: false });

interface PublishFormIdea {
    idea: DtoPersonalIdea;
}
export const PublishFormIdea: React.FC<PublishFormIdea> = ({ idea }) => {
    const { t } = useTranslation();
    const [manually, setManually] = useState<boolean>(false);
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
            })
            .catch((e) => dispatch(alertError(ErrorsResponse.Catch)));
    };

    const formik = useFormik({
        initialValues: convertFormPublishIdea(idea),
        // validationSchema: CreatePredictionSchema, TODO: Написать валидацию
        onSubmit: handleSubmit,
    });

    if (!manually && idea.status !== IdeaStatus.Analyzed) {
        return <ManuallyPublish setManually={() => setManually(true)} />;
    }

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Grid mb={3} spacing={2} direction="row" container>
                <Grid item md={4}>
                    <TextField
                        disabled
                        fullWidth
                        label={t("Company")}
                        value={idea.company.name}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        label={t("Price buy")}
                        name="price_buy"
                        type="number"
                        value={formik.values.price_buy}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        label={t("Price sell")}
                        name="price_sell"
                        type="number"
                        value={formik.values.price_sell}
                        onChange={formik.handleChange}
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
                        value={Number(formik.values.is_short)}
                        handleChange={formik.handleChange}
                        label={t("Position type")}
                        name="is_short"
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        label="Possible profit"
                        disabled
                        value={`${getPossibleProfit(
                            formik.values.price_buy,
                            formik.values.price_sell,
                            formik.values.is_short
                        )} %`}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label={t("Date end")}
                            value={formik.values.date_end}
                            onChange={(val: Moment) => {
                                formik.setFieldValue(
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
                    <Typography variant="subtitle1">
                        {t("Description")}
                    </Typography>
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
                        handleChange={formik.handleChange}
                        value={formik.values.send_email}
                        name="send_email"
                        label={t("Notify subscribers by email")}
                    />
                </Grid>
            </Grid>
            <Button type="submit">{t("Publish idea")}</Button>
        </Form>
    );
};
