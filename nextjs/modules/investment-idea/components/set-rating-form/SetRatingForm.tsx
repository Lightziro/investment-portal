import React from "react";
import { useFormik } from "formik";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating,
} from "@mui/material";
import { initRatingForm } from "../../ts/init/init-forms";
import { useDispatch } from "react-redux";
import { RatingSchema } from "../../../../ts/validation/rating.validation";
import { FormRating } from "../../ts/types/forms.types";
import {
    alertInfo,
    alertSuccess,
} from "../../../../redux/actions/alertActions";
import { axios } from "../../../../utils/axios";
import {
    setIdeaRatingStats,
    setUserIdeaRating,
} from "../../../../redux/actions/viewActions";
interface SetRatingForm {
    open: boolean;
    handleClose: () => void;
    ideaId: number;
}
export const SetRatingForm: React.FC<SetRatingForm> = ({
    open,
    handleClose,
    ideaId,
}) => {
    const dispatch = useDispatch();
    const handleSubmit = async (form: FormRating) => {
        axios
            .post(`${process.env.API_URL}/api/idea/set-rating`, {
                ...form,
                ideaId,
            })
            .then((res) => {
                dispatch(setIdeaRatingStats(res.data));
                handleClose();
                dispatch(alertSuccess("Your rating successfully posted"));
            })
            .catch((e) => console.log(e)); // TODO: Добавить обработку событий
    };
    const formik = useFormik({
        initialValues: initRatingForm,
        validationSchema: RatingSchema,
        onSubmit: handleSubmit,
    });
    const handleValidSubmit = () => {
        if (formik.errors.score) {
            dispatch(alertInfo("Specify a rating from 1 to 5 stars"));
        }
    };
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Rating
                            value={formik.values.score}
                            name="score"
                            onChange={formik.handleChange}
                            size="large"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleValidSubmit}>
                        Set rating
                    </Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
