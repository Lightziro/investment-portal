import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { store } from "../../nextjs/redux/store/Store";
import { Base } from "./Base";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainRouter } from "./routes/mainRouters";
import "../../nextjs/config/i18next";

render(
    <Provider store={store as any}>
        <div className="wrapper-site">
            <Base />
        </div>
    </Provider>,
    document.getElementById("example")
);
