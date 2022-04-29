import React, { Fragment, useState } from "react";
import {
    Card,
    Grid,
    Stack,
    Skeleton,
    Divider,
    Typography,
    Avatar,
    Tooltip,
    IconButton,
} from "@mui/material";
import { CompanyModel } from "../../../../ts/types/entity/other.types";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { formatQuote } from "../../utils/format-quote";
import { FileAddOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CreatePrediction } from "../../../../components/smart/create-prediction/CreatePrediction";

interface CompanyIdeaHeader {
    companyInfo: CompanyModel;
}

export const IdeaHeader: React.FC<CompanyIdeaHeader> = ({ companyInfo }) => {
    const quoteData = useRootSelector((state) => state.view.idea.quote);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    if (!companyInfo) {
        return <Skeleton variant="rectangular" height={56} />;
    }
    const getColorQuote = (changeToday: number) => {
        return changeToday > 0 ? "green" : "red";
    };
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper">
            <Grid container direction="row" justifyContent="space-between">
                <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar
                        src={`${process.env.API_URL}/storage/${companyInfo.logo}`}
                    />
                    <span>{`${companyInfo.name}(${companyInfo.ticker})`}</span>
                    <Divider
                        className="hr-separator"
                        orientation="vertical"
                        flexItem
                    />
                    {quoteData ? (
                        <Fragment>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                ${quoteData.value_last}
                            </Typography>
                            <span
                                className="quote-change"
                                style={{
                                    color: getColorQuote(
                                        quoteData.value_change
                                    ),
                                }}
                            >
                                {formatQuote(quoteData.value_change)}
                            </span>
                            <span
                                className="quote-change-percent"
                                style={{
                                    color: getColorQuote(
                                        quoteData.value_change
                                    ),
                                }}
                            >
                                {`(${formatQuote(
                                    quoteData.value_change_percent.toFixed(2)
                                )}%)`}
                            </span>
                        </Fragment>
                    ) : (
                        <Skeleton variant="rectangular" width="100%" />
                    )}
                </Stack>
                <Tooltip title={t("Create prediction")}>
                    <IconButton
                        onClick={() => setOpen(true)}
                        aria-label="upload picture"
                        component="span"
                    >
                        <FileAddOutlined />
                    </IconButton>
                </Tooltip>
                <CreatePrediction
                    companyId={companyInfo.company_id}
                    open={open}
                    setOpen={setOpen}
                />
            </Grid>
        </Card>
    );
};
