import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { mainStore } from "./redux/store/mainStore";
import { Base } from "./Base";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainRouter } from "./routes/mainRouters";

render(
    <Provider store={mainStore as any}>
        <div className="wrapper-site">
            <Base />
        </div>
    </Provider>,
    document.getElementById("example")
);
