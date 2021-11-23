import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAnalyticData } from "../../../redux/actions/adminActions";

export const SmartAnalytic: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAnalyticData());
    }, []);
    return <div>Test</div>;
};
