import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";

const apiKey = process.env.REACT_APP_STREAM_KEY;

const container = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App apiKey={apiKey!} />
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
