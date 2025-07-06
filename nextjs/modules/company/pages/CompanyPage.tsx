import React, { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import { useDispatch } from "react-redux";
import { fetchCompanyStats } from "../../../redux/actions/investmentIdeaActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { clearView } from "../../../redux/actions/viewActions";
import { CompanyHeader } from "../components/company-header/CompanyHeader";
import { useTranslation } from "react-i18next";
import { Entity } from "../../../ts/enums/other.enums";
import { CommentsList } from "../../../components/smart/comments-list/CommentsList";
import { IdeaHeader } from "../../investment-idea/components/idea-header/IdeaHeader";

interface CompanyPage {
    company: CompanyModel;
}

export const CompanyPage: React.FC<CompanyPage> = ({ company }) => {
    const dispatch = useDispatch();
    const container = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(clearView(Entity.Company));
        dispatch(fetchCompanyStats(company.company_id, Entity.Company));
    }, []);
    console.log(company);

    useEffect(() => {
        if (company.currency === "USD") {
            const script = document.createElement("script");
            script.src =
                "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
              "symbol": "NASDAQ:${company.ticker}",
              "interval": "D",
              "height": "500",
              "timezone": "Etc/UTC",
              "theme": "light",
              "style": "1",
              "locale": "ru",
              "enable_publishing": false,
              "allow_symbol_change": true,
              "calendar": false,
              "support_host": "https://www.tradingview.com"
            }`;
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="flex">
            <IdeaHeader companyInfo={company} />
            <div
                className="tradingview-widget-container"
                ref={container}
                style={{ height: "500", width: "100%" }}
            ></div>
        </div>
    );
};
