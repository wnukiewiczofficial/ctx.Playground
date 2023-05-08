import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/ctx.Playground">
    <Routing />
  </BrowserRouter>
);
