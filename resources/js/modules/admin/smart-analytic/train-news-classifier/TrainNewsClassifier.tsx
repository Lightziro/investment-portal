import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
interface TrainNewsClassifier {
    open: boolean;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const TrainNewsClassifier: React.FC<TrainNewsClassifier> = ({
    open,
}) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => console.log(123)}
        >
            Test
        </Dialog>
    );
};
