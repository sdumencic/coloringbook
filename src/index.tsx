import "normalize.css";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
