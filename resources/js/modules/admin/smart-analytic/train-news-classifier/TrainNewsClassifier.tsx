import React, { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";
import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Box,
    Typography,
    SelectChangeEvent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { NewsPrediction } from "../../../../ts/types/redux/store.types";
import axios from "axios";
import { AccordionDetails } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { useDispatch } from "react-redux";
import { retrainNewsClassifier } from "../../../../redux/actions/adminActions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TrainNewsClassifier {
    open: boolean;
    onClose: () => void;
}

export const TrainNewsClassifier: React.FC<TrainNewsClassifier> = ({
    open,
    onClose,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [prediction, setPrediction] = useState<NewsPrediction[]>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleChangePredict = (event: SelectChangeEvent) => {
        setPrediction((prev) =>
            prev.map((item) => {
                if (item.id.toString() === event.target.name) {
                    item.prediction = event.target.value;
                }
                return item;
            })
        );
    };
    const handleLoadNews = () => {
        setLoading(true);
        try {
            axios
                .get("/api/admin/smart-analytic/last-news")
                .then((response) => {
                    setPrediction(response.data);
                    setLoading(false);
                });
        } catch (e) {}
    };
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
        >
            <DialogTitle>
                {t("Load last news and give prediction by type influences")}
            </DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : !prediction ? (
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleLoadNews}
                    >
                        Load last news
                    </Button>
                ) : (
                    prediction.map((item) => (
                        <Accordion key={item.id}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Prediction
                                    </InputLabel>
                                    <Select
                                        value={item.prediction}
                                        label="Prediction"
                                        name={item.id.toString()}
                                        onChange={(e) => handleChangePredict(e)}
                                    >
                                        {[
                                            "positive",
                                            "neutral",
                                            "negative",
                                        ].map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {t(type)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
                <DialogActions>
                    {/*<Button onClick={handleClose}>Cancel</Button>*/}
                    <Button
                        onClick={() =>
                            dispatch(retrainNewsClassifier(prediction))
                        }
                    >
                        Train classifier
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
