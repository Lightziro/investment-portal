import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { News } from "../ts/types/state/stock-market.types";
import { Auth } from "../modules/auth/Auth";

export const Base: React.FC = () => {
    // const [news, setNews] = useState<News[]>([]);
    // useEffect(() => {
    //     axios.get("/api/news/all").then((res) => setNews(res.data));
    // }, []);
    // const test: string = "Testick";
    // const result: number = 321232;
    // if (!news.length) {
    //     return <div>Loading...</div>;
    // }
    return <Auth />;
};
