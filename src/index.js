import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
