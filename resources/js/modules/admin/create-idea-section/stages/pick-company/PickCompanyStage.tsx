import React, { Fragment, useState } from "react";
import { Box, DialogContent } from "@mui/material";
import { AutoCompleteCompanies } from "../../fields/AutoCompleteCompanies";
import { ActionsDialog } from "../../ActionsDialog";
import { useDispatch } from "react-redux";
import {
    setCompanyIdea,
    setStage,
} from "../../../../../redux/actions/admin/createIdeaActions";
import { alertInfo } from "../../../../../redux/actions/alertActions";
export const PickCompanyStage: React.FC = () => {
    const dispatch = useDispatch();
    const [company, setCompany] = useState<string>(null);
    const handleNextStage = () => {
        if (!company) {
            dispatch(alertInfo("Select company"));
            return;
        }
        dispatch(setCompanyIdea(company));
        dispatch(setStage(2));
    };
    return (
        <Fragment>
            <DialogContent>
                <Box sx={{ py: 2 }}>
                    <AutoCompleteCompanies
                        company={company}
                        changeCompany={(value) => setCompany(value)}
                    />
                </Box>
            </DialogContent>
            <ActionsDialog handler={handleNextStage} />
        </Fragment>
    );
};
