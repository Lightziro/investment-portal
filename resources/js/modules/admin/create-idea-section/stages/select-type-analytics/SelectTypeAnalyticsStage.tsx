import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../../ts/types/redux/store.types";
import axios from "axios";

export const SelectTypeAnalyticsStage: React.FC = () => {
    const company = useSelector(
        (state: StoreData) => state.admin.createIdea.selectedCompany
    );
    useEffect(() => {
        axios
            .post("/api/admin/classification-news", { name: company })
            .then((response) => console.log(response.data));
    }, []);
    return <div>{company}</div>;
};
