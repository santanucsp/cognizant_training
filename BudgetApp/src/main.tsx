import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AppStore } from "./state/AppStore";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={AppStore}>
    <App />
  </Provider>
);