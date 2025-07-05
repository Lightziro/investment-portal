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
import { CreatePrediction } from "../../../../components/smart/create-prediction/PredictionModal";
import cn from "classnames";
import styles from "./IdeaHeader.module.scss";
import { Button } from "react-bootstrap";

interface CompanyIdeaHeader {
    companyInfo: CompanyModel;
}

export const IdeaHeader: React.FC<CompanyIdeaHeader> = ({ companyInfo }) => {
    const user = useRootSelector((state) => state.user.data);
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
            <div className={styles.headerWrapper}>
                <div className={styles.leftWrapper}>
                    <div className={styles.infoWrapper}>
                        <Avatar
                            src={`${process.env.API_URL}/storage/${companyInfo.logo_path}`}
                        />
                        <span>{`${companyInfo.name}(${companyInfo.ticker})`}</span>
                    </div>
                    <Divider
                        className={cn("hr-separator", styles.divider)}
                        orientation="vertical"
                        flexItem
                    />
                    <div className={styles.priceWrapper}>
                        <div className={styles.currentPrice}>
                            ${companyInfo.last_price}
                        </div>
                        <div className={styles.quoteChangeWrapper}>
                            <span
                                className="quote-change"
                                style={{
                                    color: getColorQuote(
                                        companyInfo.last_price
                                    ),
                                }}
                            >
                                {formatQuote(companyInfo.last_price)}
                            </span>
                            <span
                                className="quote-change-percent"
                                style={{
                                    color: getColorQuote(
                                        companyInfo.change_percent_today
                                    ),
                                }}
                            >
                                {`(${formatQuote(
                                    companyInfo.change_percent_today.toFixed(2)
                                )}%)`}
                            </span>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    variant="primary"
                    type="submit"
                >
                    {t("Make predict")}
                </Button>
                <CreatePrediction
                    company={companyInfo}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </Card>
    );
};
