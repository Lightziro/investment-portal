import React from "react";
import classes from "../AdminCardStats.module.scss";

export const IconCardWrapper: React.FC = ({ children }) => {
    return <div className={classes.cardIconWrapper}>{children}</div>;
};
