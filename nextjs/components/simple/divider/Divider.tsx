import React from "react";
import classes from "../../../styles/main.scss";
export const Divider: React.FC = ({ ...other }) => {
    return <hr className={classes.mainDivider} />;
};
