import React, { Fragment } from "react";
import { Box, DialogContent } from "@mui/material";
import { AutoCompleteCompanies } from "../../fields/AutoCompleteCompanies";
import { ActionsDialog } from "../../ActionsDialog";
export const PickCompanyStage: React.FC = () => {
    const handleSelectCompany = () => {};
    const handleNextStage = () => {};
    return (
        <Fragment>
            <DialogContent>
                <Box sx={{ py: 2 }}>
                    <AutoCompleteCompanies setSelected={handleSelectCompany} />
                </Box>
            </DialogContent>
            <ActionsDialog handler={handleNextStage} />
        </Fragment>
    );
};
