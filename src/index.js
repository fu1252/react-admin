import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
    <App />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
